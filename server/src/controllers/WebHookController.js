

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');

exports.StripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,                              // ⚠️ Must be RAW body
            sig,
            process.env.STRIPE_WEBHOOK_SECRET      // From Stripe Dashboard
        );
    } catch (err) {
        console.error('Webhook signature failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle successful payment
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const order = await OrderModel.findOneAndUpdate(
                { 'paymentInfo.transactionId': session.id },
                {
                    status: 'Processing',
                    'paymentInfo.paymentStatus': 'Paid'
                },
                { new: true }
            );

            if (order) {
                await CartModel.deleteMany({ userID: order.userID });
                console.log('✅ Order confirmed & cart cleared:', order._id);
            }
        } catch (err) {
            console.error('DB update failed:', err.message);
            return res.status(500).json({ error: 'DB update failed' });
        }
    }

    res.json({ received: true });
};
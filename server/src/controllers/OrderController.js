require('dotenv').config()
const CartModel = require("../models/CartModel")
const OrderModel = require("../models/OrderModel")

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const Stripe = require('stripe')
const stripe = new Stripe(stripeSecretKey)
const { ObjectId } = require('mongoose').Types


// Create Order With Cash
exports.PlaceOrderCash = async (req, res, next) => {
    try {
        const userID = req.user._id
        const { address } = req.body

         // 1. Get cart items for this user
        const cartItems = await CartModel.find({userID}).populate('productID')
        if(!cartItems.length) {
            const err = new Error('Cart is Empty.')
            err.status = 400
            next(err)
        }


        // 2. Build products array + calculate totals
        let subTotal = 0
        const products = cartItems.map(item => {
            const unitPrice = item.productID.discountPrice ?? item.productID.price
            const totalItemPrice = unitPrice * item.quantity

            subTotal += totalItemPrice

            return {
                productID: item.productID._id,
                quantity: item.quantity,
                price: unitPrice
            }
        })


        const discount = 0
        const shippingCost = 10
        const totalAmount = subTotal - discount + shippingCost

        const newOrder = {
            userID, products, address, subTotal, discount, shippingCost, totalAmount,
            status: 'Pending',
            paymentMethod: 'COD',
            paymentInfo: {
                transactionId: null,
                paymentStatus: 'Pending'
            }
        }

        // 3. Create order
        const data = await OrderModel.create(newOrder)
        // 4. Clear cart
        await CartModel.deleteMany({userID})

         // 5. Response
        return res.status(201).json({success: true, message: 'Order placed successfully', data: data})
    } catch (error) {
        next(error)
    }
}

// Create Order With Stripe
exports.PlaceOrderStripe = async (req, res, next) => {
    try {
        const userID = req.user._id
        const { address } = req.body

         // 1. Get cart items for this user
        const cartItems = await CartModel.find({userID}).populate('productID')
        if(!cartItems.length) {
            const err = new Error('Cart is Empty.')
            err.status = 400
            next(err)
        }

        // 2. Build products array + calculate totals
        let subTotal = 0
        const products = cartItems.map(item => {
            const unitPrice = item.productID.discountPrice ?? item.productID.price
            const totalItemPrice = unitPrice * item.quantity

            subTotal += totalItemPrice

            return {
                productID: item.productID._id,
                quantity: item.quantity,
                price: unitPrice
            }
        })

        const discount = 0
        const shippingCost = 10
        const totalAmount = subTotal - discount + shippingCost

        // 3. Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: cartItems.map(item => {
                const unitPrice = item.productID.discountPrice ?? item.productID.price
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.productID.name
                        },
                        unit_amount: Math.round(unitPrice * 100) //cent
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/order-cancel`,
        })


        const newOrder = {
            userID, products, address, subTotal, discount, shippingCost, totalAmount,
            status: 'Pending',
            paymentMethod: 'Stripe',
            paymentInfo: {
                transactionId: session.id,
                paymentStatus: 'Pending'
            }
        }

        // 3. Create order
        const data = await OrderModel.create(newOrder)
        // 4. Clear cart
        await CartModel.deleteMany({userID})

         // 5. Response
        return res.status(201).json({success: true, message: 'Stripe session created', sessionUrl: session.url, data: data})

    } catch (error) {
        next(error)
    }
}


// Order data for user
exports.UserOrderData = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.user._id)
        const MatchStage = {$match: {userID: userId}}
        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'products.productID', foreignField: '_id', as: 'productDetails'}} 
        const UnwindProductStage = {$unwind: '$productDetails'}
        const ProjectionStage =   {
                    $project: {
                        _id: 1,
                        products: 1,
                        productDetails: { _id: 1, name: 1, image: 1, price: 1, discountPrice: 1 },
                        address: 1,
                        subTotal: 1,
                        discount: 1,
                        shippingCost: 1,
                        totalAmount: 1,
                        paymentMethod: 1,
                        payment: 1,
                        status: 1,
                        createdAt: 1
                    }
                }
        const SortStage = { $sort: { createdAt: -1 } }// latest first

        const data = await OrderModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage,
            ProjectionStage,
            SortStage
        ])

        return res.status(200).json({success: true, count: data.length, data})


    } catch (error) {
        next(error)
    }
}


// Get All Data for Admin
exports.GetAllOrders = async (req, res, next) => {
    try {
        const JoinWithUserStage = {$lookup: {from: 'users', localField: 'userID', foreignField: '_id', as: 'user'}} 
        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'products.productID', foreignField: '_id', as: 'productDetails'}} 
        const UnwindUserStage = {$unwind: '$user'}
        const UnwindProductStage = {$unwind: '$productDetails'}
        const ProjectionStage =   {
                    $project: {
                        _id: 1,
                        userID: 1,
                        "user.name": 1,
                        "user.email": 1,
                        products: 1,
                        productDetails: { _id: 1, name: 1, image: 1, price: 1, discountPrice: 1 },
                        address: 1,
                        subTotal: 1,
                        discount: 1,
                        shippingCost: 1,
                        totalAmount: 1,
                        paymentMethod: 1,
                        payment: 1,
                        status: 1,
                        createdAt: 1
                    }
                }
        const SortStage = { $sort: { createdAt: -1 } }// latest first

        const data = await OrderModel.aggregate([
            JoinWithUserStage,
            JoinWithProductStage,
            UnwindUserStage,
            UnwindProductStage,
            ProjectionStage,
            SortStage
        ])

        return res.status(200).json({success: true, count: data.length, data})
    } catch (error) {
        next(error)
    }
}

// Order Status Update from Admin Panel
exports.OrderStatusUpdate = async (req, res, next) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        // allowed statuses
        const allowedStatues = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        if(!allowedStatues.includes(status)) {
            const err = new Error('Invalid order status')
            err.status = 400
            return next(err)
        }

        const order = await OrderModel.findByIdAndUpdate( orderId, { status }, {new: true})
        if(!order) {
            const err = new Error('Order not found')
            err.status = 400
            return next(err)
        }

        return res.status(200).json({success: true, message: 'Order status updated successfull.', data: order})
    } catch (error) {
        next(error)
    }
}

const CartModel = require("../models/CartModel")
const ProductModel = require("../models/ProductModel")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId




// Create Cart list
exports.CreatCartList = async (req, res, next) => {
    try {
        const {productID, quantity} = req.body
        const userID = req.user._id

        // validate
        if (!productID || !quantity ) {
            const err = new Error('ProductID & quantity is requried.')
            err.status = 400
            return next(err)
        }

        // find product to get current price (snapshot)
        const product = await ProductModel.findById(productID)
        if (!product) {
            const err = new Error('Product not found')
            err.status = 404
            return next(err)
        }
        // console.log("Product found:", product);
        // console.log("Price:", product.price, "DiscountPrice:", product.discountPrice);

        // ✅ Take discounted price if available, else original price
        const price = product.discountPrice ?? product.price;

        // check if product already exists in cart for this user
        let cartItem = await CartModel.findOne({userID, productID})

        if (cartItem) {
            const oldQuantity = cartItem.quantity
            // if product already in cart, update quantity
            cartItem.quantity = Number(quantity) // increase existing quantity

             // recalc total price based on quantity
            const unitPrice = product.price - (product.price * ((product.discount ?? 0) / 100));
            cartItem.price = unitPrice * cartItem.quantity;

            await cartItem.save()

            let message = ''
            if (cartItem.quantity > oldQuantity) {
                message = 'Product increased successfully.'
            } else if (cartItem.quantity < oldQuantity) {
                message = 'Product decreased successfully.'
            }
            return res.status(201).json({success: true, message, data: cartItem})
        } else {
            // otherwise create new cart item
            const unitPrice = product.price - (product.price * ((product.discount ?? 0) / 100));

            // otherwise create new cart item
            cartItem = await CartModel.create({
                productID, userID, quantity, price: unitPrice * quantity
            })
        }


        return res.status(201).json({success: true, message: 'Product added to cart successfully.', data: cartItem})
    } catch (error) {
        next(error)
    }
}

exports.CartList = async (req, res, next) => {
      try {
        const userId = new ObjectId(req.user._id)
        const MatchStage = {$match: { userID: userId}}

        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}}
        const UnwindProductStage = {$unwind: '$product'}

        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'product.brandID', foreignField: '_id', as: 'brand'}}
        const UnwindBrandStage = {$unwind: '$brand'}

        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'product.categoryID', foreignField: '_id', as: 'category'}}
        const UnwindCategoryStage = {$unwind: '$category'}

        const ProjectionStage = {
              $project: {
                      _id: 1,
                      name: "$product.name",
                      image: "$product.image",
                      price: "$product.price",
                      quantity: 1,
                      productID: 1,
                      discountPrice: "$product.discountPrice",
                      brandName: "$brand.brandName",
                      categoryName: "$category.categoryName",
                      totalPrice: {
                        $multiply: [
                          "$quantity",
                          { $ifNull: ["$product.discountPrice", "$product.price"] }
                        ]
                      }
                    },
                  }

        const data = await CartModel.aggregate([
                    MatchStage,
                    JoinWithProductStage,
                    UnwindProductStage,
                    JoinWithBrandStage,
                    UnwindBrandStage,
                    JoinWithCategoryStage,
                    UnwindCategoryStage,
                    ProjectionStage
                ])
        
                return res.status(200).json({success: true, data}) 
    } catch (error) {
        next(error)
    }
}

// update Cart
exports.UpdateCart = async (req, res, next) => {
  try {
    const { cartID } = req.params;   // cart item id
    const { quantity } = req.body;   // new quantity
    const userID = req.user._id;     // logged-in user

    if (!quantity || quantity < 1) {
      const err = new Error("Quantity must be at least 1");
      err.status = 400;
      return next(err);
    }

    // find cart item
    let cartItem = await CartModel.findOne({ _id: cartID, userID }).populate("productID");
    if (!cartItem) {
      const err = new Error("Cart item not found");
      err.status = 404;
      return next(err);
    }

    const product = cartItem.productID;
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    // unit price (consider discount if available)
    const unitPrice = product.discountPrice ?? product.price;

    // update quantity & total price
    cartItem.quantity = quantity;
    cartItem.price = unitPrice * quantity;

    await cartItem.save();

    return res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
      data: cartItem,
    });
  } catch (error) {
    next(error);
  }
};

// Remove Cart list
exports.RemoveCart = async (req, res, next) => {
  try {
    const userId = req.user._id
    const id = req.params.id
    const Query = {_id: id}


    const deleteItem = await CartModel.findOneAndDelete(Query,{ userId })
      if(!deleteItem) {
        const err = new Error('Cart Item not found!')
        err.status = 404
        return next(err)
      }
      
      return res.status(200).json({success: true, message: 'Cart product delete successfull.'})

  } catch (error) {
    next(error)
  }
}

// Clear Cart
exports.ClearCart = async (req, res, next) => {
  try {
    const userID = req.user._id

    await CartModel.deleteMany({userID})

    return res.status(200).json({success: true, message: 'Cart cleared successfully'})
  } catch (error) {
    next(error)
  }
}




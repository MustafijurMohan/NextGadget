const ProductModel = require("../models/ProductModel")
const WishModel = require("../models/WishModel")
const { ObjectId } = require('mongoose').Types

// Create Wish List
exports.CreateWishList = async (req, res, next) => {
    try {
        const { productID } = req.body
        const userID = req.user._id

        // validation
        if(!productID) {
            const err = new Error('Product ID is required.')
            err.status = 400
            return next(err)
        }

        // check if product exists
        const product = await ProductModel.findById(productID)
        if(!product) {
            const err = new Error('Product not found.')
            err.status = 404
            return next(err)
        }

        // check if already in wishlist
        const exitingWish = await WishModel.findOne({userID, productID})
        if(exitingWish) {
            return res.status(200).json({success: true, message: 'Product already in wishlist.', data: exitingWish})
        }

        // create new wishlist entry
        const wish = await WishModel.create({userID, productID})
        return res.status(201).json({success: true, message: 'Product added to wishlist successfully.', data: wish})

    } catch (error) {
        next(error)
    }
}

// all wishlist
exports.ReadWishList = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.user._id)
        const MatchStage = {$match: {userID: userId}}
        
        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}}
        const UnwindProductStage = {$unwind: '$product'}
        const JoinWithCategoryStage = {$lookup: {from: 'categories', localField: 'product.categoryID', foreignField: '_id', as: 'category'}}
        const UnwindCategoryStage = {$unwind:  '$category'}
        const JoinWithBrandStage = {$lookup: {from: 'brands', localField: 'product.brandID', foreignField: '_id', as: 'brand'}}
        const UnwindBrandStage = {$unwind: '$brand'}
        // { path: '$brand', preserveNullAndEmptyArrays: true }

        const ProjectionStage = {
                $project: {
                    _id: 1,
                    productId: "$product._id",
                    name: "$product.name",
                    image: "$product.image",
                    price: "$product.price",
                    discountPrice: "$product.discountPrice",
                    brandName: "$brand.brandName",
                    categoryName: "$category.categoryName"
                }
        }

        const data = await WishModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            ProjectionStage
        ])

        return res.status(200).json({success: true, data})
    } catch (error) {
        next(error)
    }
}

// wishlist remove by id
exports.RemoveWishList = async (req, res, next) => {
    try {
        const id = req.params.id
        const Query = {_id: id}
        const userID = req.user._id

        const deleteItem = await WishModel.findOneAndDelete(Query, {userID})

        if(!deleteItem) {
            const err = new Error('Wishlist item not found.')
            err.status = 404
            return next(err)
        }

        return res.status(200).json({success: true, message: 'Product removed from wishlist successfully', data: deleteItem})
    } catch (error) {
        next(error)
    }
}

// clear all wish list
exports.ClearWishList = async (req, res, next) => {
    try {
        const userID = req.user._id
        await WishModel.deleteMany({userID})

        return res.status(200).json({success: true, message: 'Wishlist cleared successfully'})
    } catch (error) {
        next(error)
    }
}

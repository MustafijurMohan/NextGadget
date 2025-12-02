
const ProductSliderModel = require('../models/ProductSliderModel')
const cloudinary = require('cloudinary').v2


// create product slider
exports.CreateProductSlider =async(req, res, next) => {
    try {
        const {name, description} = req.body

        // 1. Basic validation checks
        if(!name || !description) {
            const err = new Error('Name & Description is required!')
            err.status = 400
            return next(err)
        }

        // // ✅ Check image from multer
        if(!req.file) {
            const err = new Error('Product Slider image is required!')
            err.status = 400
            return next(err)
        }
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'slider',
            resource_type: 'image'
        })

        await ProductSliderModel.create({name, description, image: result.secure_url})

        return res.status(201).json({success: true, message: 'Product slider create successfull.'})
    } catch (error) {
        next(error)
    }
}


// Product Slider List
exports.ProductSliderList = async (req, res, next) => {
    try {
        const data = await ProductSliderModel.find()

        return res.status(200).json({success: true, data: data})
    } catch (error) {
        next(error)
    }
}


// Product Slider delete
exports.RemoveSlider = async (req, res, next) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        await ProductSliderModel.deleteOne(Query)

        return res.status(200).json({success: true, message: 'Product slider remove successfull.'})
    } catch (error) {
        next(error)
    }
}
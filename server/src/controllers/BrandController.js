const BrandModel = require("../models/BrandModel")
const cloudinary = require('cloudinary').v2


// Create Brand
exports.CreateBrand = async (req, res, next) => {
    try {
        const { brandName } = req.body

        if(!brandName) {
            const err = new Error('Brand name is required!')
            err.status = 400
            return next(err)
        }

        // ✅ Check image from multer
        if(!req.file) {
            const err = new Error('Brand image is required!')
            err.status = 400
            return next(err)
        }

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'brands' // optional: keep images organized in a folder
        })

         // Save brand to DB
        await BrandModel.create({brandName, brandImg: result.secure_url})

        return res.status(201).json({success: true, message: 'Brand Create Successfull.'})
    } catch (error) {
        next(error); // delegate error to global handler
    }
}


// Brand List
exports.BrandList = async (req, res, next) => {
    try {
        const data = await BrandModel.find()
        return res.status(200).json({success: true, data: data})
    } catch (error) {
        next(error);
    }
}


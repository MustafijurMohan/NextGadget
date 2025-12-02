const CategoryModel = require("../models/CategoryModel")
const cloudinary = require('cloudinary').v2



exports.CreateCategory = async (req, res, next) => {
    try {
        const {categoryName} = req.body

        if(!categoryName) {
            const err = new Error('Category name is required!')
            err.status = 400
            return next(err)
        }

        // ✅ Check image from multer
        if(!req.file) {
            const err = new Error('Category image is required!')
            err.status = 400
            return next(err)
        }

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'category' // optional: keep images organized in a folder
        })

         // Save brand to DB
        await CategoryModel.create({categoryName, categoryImg: result.secure_url})

        return res.status(201).json({success: true, message: 'Category Create Successfull.'})
    } catch (error) {
        next(error); // delegate error to global handler
    }
}


exports.CategoryList = async (req, res, next) => {
    try {
        const data = await CategoryModel.find()
        return res.status(200).json({success: true, data: data})
    } catch (error) {
        next(error);
    }
}

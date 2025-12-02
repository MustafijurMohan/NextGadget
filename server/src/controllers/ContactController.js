const ContactModel = require("../models/ContactModel")


// Create Contact
exports.CreateContact = async (req, res, next) => {
    try {
        const {name, email, subject, message} = req.body

         // 1. Basic validation checks
        if(!name) {
            const err = new Error('Name is required!')
            err.status = 400
            return next(err)
        }

        // 2. Email format check (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            const err = new Error('Invalid email format!')
            err.status = 400
            return next(err)
        }

        if(!subject) {
            const err = new Error('Subject is required!')
            err.status = 400
            return next(err)
        }

        if(!message) {
            const err = new Error('Message is required!')
            err.status = 400
            return next(err)
        }

        // Crate Data in database

        await ContactModel.create({name, email, subject, message})

        return res.status(201).json({success: true, message: 'Message send successfull.'})

    } catch (error) {
        next(error)
    }
}


// Contact list
exports.ContactList = async (req, res, next) => {
    try {
        const data = await ContactModel.find()

        return res.status(200).json({success: true, data: data})
    } catch (error) {
        next(error)
    }
}


// Delete Contact
exports.RemoveContact = async (req, res, next) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        await ContactModel.deleteOne(Query)

        return res.status(200).json({success: true, message: 'Contact remove successfull.'})
    } catch (error) {
        next(error)
    }
}

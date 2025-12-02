require('dotenv').config()
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY


exports.AuthVerification = async (req, res, next) => {
    try {
        const token = req.headers.token

        // Check Authorization header
        if(!token) {
            const err = new Error('Unauthorized or token missing')
            err.status = 401
            return next(err)
        }

        // Verify token
        const decoded = jwt.verify(token, secretKey)
        // console.log(decoded)

        // Attach user to request (excluding password)
        const userData = await UserModel.findOne({_id: decoded.userId}).select('-password')
        // console.log(userData)

        if(!userData) {
            const err = new Error("User not found")
            err.status = 401
            return next(err)
        }

        req.user = userData
        next()
        // console.log(req.user = userData)

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired, please login again" });
            }
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
}

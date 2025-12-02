require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const OTPModel = require('../models/OTPModel')
const EmailSend = require('../utility/EmailHelper')
const secretKey = process.env.SECRET_KEY
const cloudinary = require('cloudinary').v2

// user register
exports.registerUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body

        // 1. Basic validation checks
        if(!name || !email || !password) {
            const err = new Error('All fields are required!')
            err.status = 400
            return next(err)
        }

        // 2. Email format check (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            const err = new Error('Invalid email format!')
            err.status = 400
            return next(err)
        }

        // 3. Password length check
        if(password.length < 6) {
            const err = new Error('Password must be at least 6 characters long!')
            err.status = 400
            return next(err)
        }

        // 4. Check if user already exists
        const userExits = await UserModel.findOne({email})
        if(userExits) {
            const err = new Error('User already exists with this email!')
            err.status = 400
            return next(err)
        }

        // 5.Password hash and salt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // 6. Crate Data in database
        const user = await UserModel.create({name, email, password: hashedPassword})

        // 7. Genrate Token 
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, secretKey, {expiresIn: '7d'})

        const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                country: user.country,
                mobile: user.mobile,
                createdAt: user.createdAt
            }

        // 8. Return response
        return res.status(201).json({success: true, message: 'User registered successfully', data: userResponse, token })
    } catch (error) {
        next(error)
    }
}

// user login
exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // 1. Check if both fields are provided
        if( !email || !password) {
            const err = new Error('Email & Password are required!')
            err.status = 400
            return next(err)
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            const err = new Error('Invalid email format!')
            err.status = 400
            return next(err)
        }

        // 3. Check if user exists
        const user = await UserModel.findOne({email})
        if(!user) {
            const err = new Error('Invalid email or password !')
            err.status = 401
            return next(err)
        }

        // 4. Check password match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            const err = new Error('Invalid email or password !')
            err.status = 401
            return next(err)
        }

        // 5. Generate Token
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, secretKey, {expiresIn: '7d'})

        
        const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                country: user.country,
                mobile: user.mobile,
                createdAt: user.createdAt
            }

        // 6. Return response
        return res.status(201).json({success: true, message: 'User login successfully', data: userResponse, token })
    } catch (error) {
        next(error)
    }
}


// find single user
exports.singleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Query = {_id: id}

    const user = await UserModel.findOne(Query).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};


// all user list
exports.userList = async (req, res, next) => {
    try {
        const data = await UserModel.find()

        return res.status(200).json({success: true, data: data})
    } catch (error) {
        next(error)
    }
}


// update user
exports.updateProfile = async (req, res, next) => {
    try {
        const id = req.user._id
        // const Query = {_id: id}
        const {name, email, country, mobile} = req.body

          // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                const err = new Error("Invalid email format!");
                err.status = 400;
                return next(err);
            }

        // Validate Mobile
            if (!/^\d{11}$/.test(mobile)) {
                const err = new Error("Mobile must be exactly 11 digits!");
                err.status = 400;
                return next(err);
            }


         // Handle Cloudinary Image Upload (if file exists)
            let imageUrl;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "users",
                });
                imageUrl = result.secure_url;
            }

            // Build update data (only include provided fields)
            const updateData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(country && { country }),
            ...(imageUrl && { image: imageUrl }),
            };

            const updatedUser = await UserModel.findByIdAndUpdate(id, {$set: updateData}, {upsert: true})

        return res.status(201).json({success: true, data: updatedUser, message: 'Profile update successfull.'})
    } catch (error) {
        next(error)
    }
}


// delete user 
exports.deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        await UserModel.deleteOne(Query)

        return res.status(200).json({success: true, message: 'User delete successfull.'})
    } catch (error) {
        next(error)
    }
}




// Forgot Password Controller
// User Email Verify
exports.UserVerifyEmail = async (req, res, next) => {
    try {
        // Email Account Query
        const email = req.params.email
        const OTPCode = Math.floor(100000 + Math.random() * 90000) // 6-digit OTP

        // Check user exists
        const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "No User Found." });
            }

        // Save or update otp
        await OTPModel.findOneAndUpdate({email}, {otp: OTPCode, status: 0},{upsert: true, new: true})

        // Send Email
        await EmailSend(email, `Your OTP Code is: ${OTPCode}`, " Forgot Password Verification");
        return res.status(201).json({ success: true, message: "OTP sent successfully to your email." });

    } catch (error) {
        next(error)
    }
}


// User OTP Verify
exports.UserOtpVerify = async (req, res, next) => {
    try {
            const { email, otp } = req.body;
            const OTPCode = Number(otp);

        // 1. Check if OTP exists and is unused
        const otpRecord = await OTPModel.findOne({ email, otp: OTPCode, status: 0 });
        

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP code." });
        }

        // 2. Update status -> mark OTP as used
        otpRecord.status = 1;
        await otpRecord.save();

        // 3. Success response
        return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        next(error);
    }
}


// User Reset Password
exports.UserResetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Basic validation
    if (!email || !otp || !newPassword) {
        const err = new Error("Email, OTP and new password are required.")
        err.status = 400
        return next(err)
    }

     // 2. Password length check
    if (newPassword.length < 6) {
        const err = new Error("Password must be at least 6 characters long!")
        err.status = 400
        return next(err)
    };
    

    // 3. Find OTP record that is verified (status = 1)
    const otpRecord = await OTPModel.findOne({ email, otp: Number(otp), status: 1 });
    if (!otpRecord) {
        const err = new Error("Invalid OTP or request.")
        err.status = 400
        return next(err)
    }

    // 4. Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update user's password
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // 6. Optional: mark OTP as used again (status = 2) to prevent reuse
    otpRecord.status = 2;
    await otpRecord.save();

    return res.status(200).json({ success: true, message: "Password reset successfully." });

  } catch (error) {
    next(error);
  }
};



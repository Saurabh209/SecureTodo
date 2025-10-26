
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { SetToken } from '../utils/SetToken.js';


// login controller
export const postloginSubmit = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const currentUser = await user.findOne({ username });

        if (!currentUser) {
            const error = new Error("User not exist")
            error.statuscode = 404
            return next(error)
        }

        const isPasswordMatch = await bcrypt.compare(password, currentUser.password);

        if (!isPasswordMatch) {
            const error = new Error("Invalid Username or Password")
            error.statuscode = 401
            return next(error)
        }



        // setting token after authentication
        SetToken(res, currentUser)

    } catch (err) {
        const error = new Error("")
        return next(error)
    }
}

// registration controller
export const postregistrationSubmit = async (req, res,next) => {
    try {

        const isUserExist = await user.findOne({ username: req.body.username });
        if (isUserExist) {
            return res.status(409).json({ success: false, message: "Username already taken" });
        }

        const isEmailExist = await user.findOne({ email: req.body.email });
        if (isEmailExist) {
            return res.status(409).json({ success: false, message: "email already in use " });
        }

        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const currentUser = await user.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
        });

        // setting token after authentication
        SetToken(res, currentUser)

    } catch (err) {
        const error = new Error("")
        return next(error)
    }
}

// profile view controller
export const profile = async (req, res,next) => {
    try {
        const userProfile = await user.findById(req.user._id)

        return res.status(200).json({
            success: true,
            userProfile
        })
    } catch (err) {
        const error = new Error("")
        return next(error)
    }
}

// get All user Controller for adim dashboard
export const getAllUsers = async (req, res,next) => {
    try {
        const AllUsers = await user.find({})
        console.log("all users: ", AllUsers)

        return res.status(200).json({
            success:true,
            AllUsers
        })

    } catch (err) {
        const error = new Error("")
        return next(error)
    }
}

// logout controller
export const getlogout = (req, res, next) => {
    try {
        res.cookie('isLoggedIn', null, {
            expires: new Date(0),
            secure: true,
            sameSite: "none"
        }).json({
            success: true,
            messgege: "Logout successful"
        })
    } catch (err) {
        const error = new Error("Logout failed")
        error.statuscode = 500
        return next(error)
    }
}

// verify user controller
export const verifyUser = (req,res)=>{
    return res.status(200).jsonp({
        success:true,
        message:"User Authentication Complete ",
        userId:req.user._id
    })
}

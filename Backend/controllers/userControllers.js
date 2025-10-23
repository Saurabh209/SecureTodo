
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { SetToken } from '../utils/SetToken.js';



export const postloginSubmit = async (req, res) => {
    try {
        const { username, password } = req.body;
        const currentUser = await user.findOne({ username });

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid Username or Password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, currentUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password"
            })
        }



        // setting token after authentication
        SetToken(res, currentUser)

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}
export const postregistrationSubmit = async (req, res) => {
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
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export const profile = async (req, res) => {
    try {

        const userProfile = await user.findById(req.user._id)

        return res.status(200).json({
            success: true,
            userProfile
        })
    } catch (error) {

    }
}

export const getAllUsers = async (req, res) => {
    try {
        const AllUsers = await user.find({})
        console.log("all users: ", AllUsers)
        return res.status(200).json({
            AllUsers
        })

    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}


export const getlogout = (req, res) => {
    try {
        res.cookie('isLoggedIn', null, {
            expires: new Date(Date.now())
        }).json({
            success: true,
            messgege: "logout successfull"
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            messege:"logout failed"
        })
    }
}

import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { SetToken } from '../utils/SetToken.js';


export const getnull = (req, res) => {
    res.redirect('/homePage');
}
export const getlogin = (req, res) => {
    res.render('login')
}
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

        const userAuthToken = jwt.sign({ _id: currentUser._id }, process.env.JWT_SECRET);

        // setting token after authentication
        SetToken(res, userAuthToken, currentUser)

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}
export const getregistration = (req, res) => {
    res.render('registration');
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
export const gethomePage = (req, res) => {
    res.render('home')
}
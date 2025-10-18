
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import bcrypt from 'bcrypt'



export const getnull = (req, res) => {
    res.redirect('/homePage');
}
export const getlogin = (req, res) => {
    res.render('login')
}
export const postloginSubmit = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUserExist = await user.findOne({ username });

        if (!isUserExist) {
            console.log("user not exist");
            return res.redirect('/login');
        }

        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
        console.log("password matched?", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.render('login', { errorMsg: 'Incorrect Password', username });
        }

        const userAuthToken = jwt.sign({ _id: isUserExist._id }, 'I Am Elden Lord');
        res.cookie('isLoggedIn', userAuthToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
            sameSite: 'strict',
            secure: false
        });

        return res.redirect('/homePage');

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
            res.render('/registration', {
                fullname: req.body.fullname,
                email: req.body.email,
                confirmPassword: req.body.confirmPassword,
            });
        } else {
            const hashpassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await user.create({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hashpassword,
            });

            console.log('New user:', newUser);



            const userAuthToken = jwt.sign({ _id: newUser._id }, 'I Am Elden Lord');

            res.cookie('isLoggedIn', userAuthToken, {
                httpOnly: true,
            });
            console.log("cookie Created: ", userAuthToken)
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
export const gethomePage = (req, res) => {
    res.render('home')
}
import express from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import cookieParser from 'cookie-parser';
import { getnull, getregistration, postregistrationSubmit, gethomePage, getlogin, postloginSubmit } from '../controllers/userControllers.js';

const router = express.Router();

const loginAuthenticator = (req, res, next) => {
    const userAuthToken = req.cookies.isLoggedIn
    if (!userAuthToken) {
        return res.redirect('/login')
    }

    try {
        const decodedToken = jwt.verify(userAuthToken, "I Am Elden Lord")
        req.user = decodedToken
        console.log("decodedTOken", decodedToken)
        next()

    } catch (err) {
        console.log("Invalid token:", err.message);
        res.redirect("/login");
    }

}

router.get('/', loginAuthenticator, getnull);

router.get('/login', getlogin)

router.post('/loginSubmit', postloginSubmit)

router.get('/registration', getregistration);

router.post('/registrationSubmit', postregistrationSubmit);

router.get('/homePage', loginAuthenticator, gethomePage)

router.get('/forgotPassword',(req,res)=>{
    res.send('why you forgot password, DUMB')
})

export default router;
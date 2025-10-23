import express from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import cookieParser from 'cookie-parser';
import { loginAuthenticator } from '../middleware/auth.middleware.js';
import { getnull, getregistration, postregistrationSubmit, gethomePage, getlogin, postloginSubmit } from '../controllers/userControllers.js';

const router = express.Router();



// router.get('/', loginAuthenticator, getnull);

// router.get('/login', getlogin)

router.post('/loginSubmit', postloginSubmit)

// router.get('/registration', getregistration);

router.post('/registrationSubmit', postregistrationSubmit);

// router.get('/homePage', loginAuthenticator, gethomePage)

// router.get('/forgotPassword',(req,res)=>{
//     res.send('why you forgot password, DUMB')
// })

export default router;
import express from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';
import cookieParser from 'cookie-parser';
import { loginAuthenticator } from '../middleware/auth.middleware.js';
import { getAllUsers,getlogout,verifyUser, profile, postregistrationSubmit, postloginSubmit } from '../controllers/userControllers.js';

const router = express.Router();


router.post('/loginSubmit', postloginSubmit)

router.post('/registrationSubmit', postregistrationSubmit);

router.get('/profile', loginAuthenticator, profile)

router.get('/AllUsers', getAllUsers)

router.get('/logout',loginAuthenticator,getlogout)

router.get('/verifyUser',loginAuthenticator,verifyUser)


export default router;
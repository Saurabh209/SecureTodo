import express from 'express';
import { posttodoSubmit, getTodo } from '../controllers/todo.controller.js';
import { loginAuthenticator, } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/todoSubmit',loginAuthenticator,posttodoSubmit)
router.get('/Todo',loginAuthenticator,getTodo)

export default router;
import express from 'express';
import { postTodo, getTodo,   } from '../controllers/todo.controller.js';
import { loginAuthenticator, } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/todo/add', loginAuthenticator, postTodo)
router.get('/todo/view', loginAuthenticator, getTodo)
// router.post('/todo/deleteTask', postDeleteTask)

export default router;
import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js'; // ✅ import multer setup

const userRouter = express.Router();

userRouter.post('/register', upload.single("profilePic"), register); // ✅ supports profilePic
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);

export default userRouter;
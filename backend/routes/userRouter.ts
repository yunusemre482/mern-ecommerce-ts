import express from 'express';
const userRouter = express.Router();
import UserController from '../controllers/user.controller';



userRouter.get('/all',UserController.getAllUsers);

export default userRouter;

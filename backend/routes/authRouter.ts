import express from 'express';
import AuthController from '../controllers/auth.controller';
import { loginValidation, registrationValidation } from '../utils/validator';
import validateRequest from '../middleware/validateRequest';
const AuthRouter = express.Router();

AuthRouter.post('/register', registrationValidation, validateRequest, AuthController.register);

AuthRouter.post('/login', loginValidation, validateRequest, AuthController.login);

export default AuthRouter;

import { lazy } from 'react';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Confirmation = lazy(() => import('./Confirmation'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const UpdateProfile = lazy(() => import('./UpdateProfile'));
const Profile = lazy(() => import('./Profile'));

export { Login, Register, Confirmation, ForgotPassword, ResetPassword, UpdateProfile, Profile };

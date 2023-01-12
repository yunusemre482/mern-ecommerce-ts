import React from 'react';
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
	FormikErrors,
	ErrorMessage,
} from 'formik';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { LoginSchema } from 'utils/formValidator';

type Props = {
	handleSubmit: (values: any) => void;
};
type MyFormValues = {
	username: string;
	password: string;
};

const FORM_DATA = [
	{
		name: 'username',
		type: 'text',
		placeholder: 'Username or Email',
		id: 'username',
	},
	{
		name: 'password',
		type: 'password',
		placeholder: 'Password',
		id: 'password',
	},
];

const LoginForm: React.FC<Props> = ({ handleSubmit }) => {
	const initialValues: MyFormValues = {
		username: '',
		password: '',
	};

	return (
		<div className={styles.login__form_container}>
			<h1 className={styles.form__title}>Welcome Back</h1>
			<div className={styles.form__card}>
				<Formik
					validationSchema={LoginSchema}
					initialValues={initialValues}
					validateOnMount={true}
					onSubmit={(values, actions) => {
						handleSubmit(values);
					}}
				>
					{({
						errors,
						touched,
					}: {
						errors: { [key: string]: any };
						touched: { [key: string]: any };
					}) => (
						<Form>
							<div className={styles.form__inputs}>
								{FORM_DATA.map((data) => (
									<div key={data.id} className={styles.form__input_cont}>
										<label htmlFor={data.id}>{data.name}</label>
										<Field
											name={data.name}
											type={data.type}
											placeholder={data.placeholder}
										/>
										<div
											className={`${styles.error__message} ${
												touched[data.name] ? 'visible' : 'hidden'
											}`}
										>
											{errors[data.name]}
										</div>
									</div>
								))}
								<div className={styles.forgot__password}>
									<a href='/forgotPassword'>Forgot your password?</a>
								</div>
							</div>

							<button className={styles.login__submit_btn} type='submit'>
								Sign In
							</button>

							<div className={styles.form__footer}>
								<span>Don't have an account ? </span>
								<Link to={'/register'}>Sign up</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;

import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from 'formik';
import styles from './Signup.module.scss';
import { Link } from 'react-router-dom';
import { SignupSchema } from 'utils/formValidator';

type Props = {
	handleSubmit: (values: any) => void;
};
type MyFormValues = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type FormInputProps = {
	name: string;
	type: string;
	placeholder: string;
	id: string;
};

const FORM_DATA = [
	{
		name: 'username',
		type: 'text',
		placeholder: 'Username or Email',
		id: 'username',
	},
	{
		name: 'email',
		type: 'email',
		placeholder: 'Email',
		id: 'email',
	},
	{
		name: 'password',
		type: 'password',
		placeholder: 'Password',
		id: 'password',
	},
	{
		name: 'confirmPassword',
		type: 'password',
		placeholder: 'Confirm Password',
		id: 'confirmPassword',
	},
];

const LoginForm: React.FC<Props> = ({ handleSubmit }) => {
	const initialValues: MyFormValues = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	return (
		<div className={styles.login__form_container}>
			<h1 className={styles.form__title}>Register to Take It</h1>
			<div className={styles.form__card}>
				<Formik
					validationSchema={SignupSchema}
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
								{FORM_DATA.map((data: FormInputProps) => (
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
								<div className={styles.terms__and__conditions}>
									<span>By clicking on Sign up, you agree to</span>
									<a
										href='https://holonext.com/terms-of-use/'
										className='link-button'
										target='_blank'
									>
										terms &amp; conditions
									</a>
									and
									<a
										href='https://holonext.com/privacy-policy/'
										className='link-button'
										target='_blank'
									>
										privacy policy
									</a>
								</div>
							</div>

							<button className={styles.login__submit_btn} type='submit'>
								Sign Up
							</button>

							<div className={styles.form__footer}>
								<span>Already have an account ? </span>
								<Link to={'/login'}>Sign In</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;

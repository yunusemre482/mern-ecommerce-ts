import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

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
					initialValues={initialValues}
					onSubmit={(values, actions) => {
						console.log({ values, actions });
						alert(JSON.stringify(values, null, 2));
					}}
				>
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
							<Link to={'/signup'}>Sign up</Link>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;

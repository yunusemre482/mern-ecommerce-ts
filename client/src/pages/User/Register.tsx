import React from 'react';
import { AuthLayout } from 'layouts';
import { SignupForm } from 'components/user/Signup';
import { type } from '@testing-library/user-event/dist/type';
import useStore from 'store';

type Props = {};

const Register = () => {
	const register = useStore((state) => state.register);

	const handleRegister = (values: any) => {
		register(values);
	};

	return (
		<AuthLayout>
			<SignupForm handleSubmit={handleRegister} />
		</AuthLayout>
	);
};

export default Register;

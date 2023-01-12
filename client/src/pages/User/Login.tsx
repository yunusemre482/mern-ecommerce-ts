import React, { useState } from 'react';
import useBoundStore from 'store';
import { AuthLayout } from 'layouts';
import { LoginForm } from 'components/user/Login';
import { ILoginUser } from 'types/user.types';
import { Navigate } from 'react-router-dom';
type Props = {};

const Login: React.FC<Props> = () => {
	const login = useBoundStore((state) => state.login);
	const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to='/profile' />;
	}

	const handleLogin = (values: ILoginUser) => {
		login(values);
	};

	return (
		<AuthLayout>
			<LoginForm handleSubmit={handleLogin} />
		</AuthLayout>
	);
};

export default Login;

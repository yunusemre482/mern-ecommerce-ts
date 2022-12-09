import React from 'react';
import useBoundStore from 'store';
import SplitScreen from 'layouts/SplitScreen/SplitScreen';
import { LoginForm, SideImage } from 'components/user/Login';
type Props = {};

const Login: React.FC<Props> = () => {
	const login = useBoundStore((state) => state.login);

	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleLogin = (values: { username: string; password: string }) => {
		login({ username, password });
	};

	return <SplitScreen right={<SideImage />} left={<LoginForm handleSubmit={handleLogin} />} />;
};

export default Login;

import React from 'react';

interface IAuth {
	isAuthenticated: boolean;
	name: string;
	roles?: string[];
}
interface IAuthProps {
	roles?: string[];
}
const useAuth = (props?: IAuthProps) => {
	var isAuthenticated = true;
	var isAllow = false;
	// if (auth) {
	// 	isAuthenticated = auth.isAuthenticated;
	// 	if (isAuthenticated && props && props.roles) {
	// 		isAllow = props.roles.some((role) => auth?.roles?.includes(role));
	// 	}
	// }
	return { isAuthenticated, isAllow };
};

export default useAuth;

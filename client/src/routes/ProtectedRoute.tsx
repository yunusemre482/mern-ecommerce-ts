import { Navigate } from 'react-router-dom';

import useBoundStore from '../store';
interface IPrivateProps {
	children?: React.ReactNode;
	allowedRoles: string[];
}
const PrivateRoute: React.FC<IPrivateProps> = ({ children, allowedRoles }) => {
	const { role, isAuthenticated } = useBoundStore((state) => ({
		role: state.user?.role || 'user',
		isAuthenticated: state.isAuthenticated,
	}));

	const isAllow = allowedRoles.includes(role);

	if (!isAuthenticated) {
		return <Navigate to={'/login'} replace />;
	}
	return <>{isAllow ? children : <div>You are not allowed to access this page</div>}</>;
};

export default PrivateRoute;

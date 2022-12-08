import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
interface IPrivateProps {
	children?: React.ReactNode;
	roles?: string[];
}
const PrivateRoute = ({ children, roles }: IPrivateProps) => {
	const { isAuthenticated, isAllow } = useAuth({ roles });

	if (!isAuthenticated) {
		return <Navigate to={'/login'} replace />;
	}
	return <>{isAllow ? children : <div>You are not allowed to access this page</div>}</>;
};

export default PrivateRoute;

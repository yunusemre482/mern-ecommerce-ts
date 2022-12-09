import { Navigate } from 'react-router-dom';

import useBoundStore from '../store';
interface IPublicRouteProps {
	children?: React.ReactNode;
}
const PublicRoute: React.FC<IPublicRouteProps> = ({ children }) => {
	const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to={'/'} replace />;
	}
	return <>{children}</>;
};

export default PublicRoute;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRouter';
import {
	Login,
	Register,
	Profile,
	ResetPassword,
	ForgotPassword,
	Confirmation,
} from '../pages/User';

import { ProductDetail, Products } from '../pages/Product';
import { MyOrders, OrderDetails } from '../pages/Order';
import { Cart, Order } from '../pages/Cart';
import { Dashboard, ProductList, UsersList } from '../pages/Admin';

const ROUTES = {
	public: [
		{
			path: '',
			component: Home,
		},
		{
			path: 'login',
			component: Login,
		},
		{
			path: 'register',
			component: Register,
		},
		{
			path: 'password/forgot',
			component: ForgotPassword,
		},
		{
			path: 'password/reset/:token',
			component: ResetPassword,
		},
		{
			path: 'confirmation/:token',
			component: Confirmation,
		},
	],
	private: [
		{
			path: 'orders',
			component: MyOrders,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'orders/:id',
			component: OrderDetails,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'cart',
			component: Cart,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'cart/order',
			component: Order,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'products',
			component: Products,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'products/:id',
			component: ProductDetail,
			allowedRoles: ['user', 'admin'],
		},
		{
			path: 'dashboard',
			component: Dashboard,
			allowedRoles: ['admin'],
		},
		{
			path: 'dashboard/products',
			component: ProductList,
			allowedRoles: ['admin'],
		},
		{
			path: 'dashboard/users',
			component: UsersList,
			allowedRoles: ['admin'],
		},
		{
			path: 'password/reset',
			component: ResetPassword,
			allowedRoles: ['user', 'admin'],
		},
	],
};

type Props = {};

const AppRouter: React.FC<Props> = () => {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{ROUTES.public.map((route, index) => {
						const Component = route.component;
						return (
							<Route
								key={index + route.path}
								path={route.path}
								element={<Component />}
							/>
						);
					})}

					{ROUTES.private.map((route, index) => {
						const Component = route.component;
						return (
							<Route
								key={index + route.path}
								path={route.path}
								element={
									<ProtectedRoute allowedRoles={route.allowedRoles}>
										<Component />
									</ProtectedRoute>
								}
							/>
						);
					})}
				</Routes>
			</Suspense>
		</Router>
	);
};

export default AppRouter;

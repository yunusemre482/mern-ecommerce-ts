import { lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const ProductList = lazy(() => import('./ProductList'));
const UsersList = lazy(() => import('./UsersList'));
const Sidebar = lazy(() => import('./Sidebar'));

export { Dashboard, ProductList, UsersList, Sidebar };

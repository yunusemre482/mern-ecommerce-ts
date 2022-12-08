import { lazy } from 'react';

const MyOrders = lazy(() => import('./MyOrders'));
const OrderDetails = lazy(() => import('./OrderDetails'));

export { OrderDetails, MyOrders };

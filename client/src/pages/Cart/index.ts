import { lazy } from 'react';

const Cart = lazy(() => import('./Cart'));
const Order = lazy(() => import('./Order'));

export { Cart, Order };

import { lazy } from 'react';

const Products = lazy(() => import('./Products'));
const ProductDetail = lazy(() => import('./ProductDetail'));

export { ProductDetail, Products };

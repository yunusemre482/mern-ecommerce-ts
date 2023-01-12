import React, { useState } from 'react';
import styles from './ProductItem.module.scss';
import ProductRate from 'components/shared/ProductRate';
import { Link } from 'react-router-dom';
import { IProduct } from 'types/product.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import useStore from 'store';

type ProductItemProps = {
	product: IProduct;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
	return (
		<a href={`products/${product._id}`} className={styles.product__wrapper}>
			<div className={styles.product__image__overlay}>
				<img src={product.image} alt={product.name} width={150} height={200} />
			</div>
			<div className={styles.product__body}>
				<h3 className={styles.product__name}>{product.name}</h3>
				<ProductRate
					rate={Math.max(Math.random() * 5, 3.2)}
					totalNumberOfRate={Math.floor(Math.random() * 1000)}
				/>
				<div className={styles.product__price}>
					<span className={styles.product__price__old}>{product.price}&#9;TL</span>
					{/* <span className={styles.product__price__new}>${product.price}</span> */}
				</div>
				{/* <div className={styles.product__quantity}>
					<label htmlFor='quantity'>Quantity : </label>
					<input id='quantity' type='number' min={1} max={10} defaultValue={1} />
				</div> */}

				<button className={styles.addToCart__btn}>
					<FontAwesomeIcon icon={faShoppingCart} />
					Add to Cart
				</button>
			</div>
			<ProductFavButton productId={product._id} />
		</a>
	);
};

type ProductFavButtonProps = {
	productId: string;
};

const ProductFavButton: React.FC<ProductFavButtonProps> = ({ productId }) => {
	const { likeProduct } = useStore((state) => ({ likeProduct: state.likeProduct }));
	return (
		<div
			className={styles.favButton}
			onClick={(e) => {
				e.preventDefault();
				likeProduct(productId);
			}}
		>
			<FontAwesomeIcon icon={faHeart} />
		</div>
	);
};

export default ProductItem;

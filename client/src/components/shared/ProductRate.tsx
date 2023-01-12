import { type } from '@testing-library/user-event/dist/type';
import { product } from 'ramda';
import React, { FC, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import './ProductRate.scss';
import { faCamera, faCameraRetro } from '@fortawesome/free-solid-svg-icons';

type ProductRateProps = {
	rate: number;
	totalNumberOfRate: number;
};

const ProductRate: FC<ProductRateProps> = ({ rate = 3.6, totalNumberOfRate }) => {
	const productRate: number[] = useMemo(() => {
		return Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
			if (i <= rate) {
				return 100;
			} else if (i > rate && i < rate + 1) {
				const floatRate = Math.floor(rate);
				const decimalRate = rate - floatRate;

				return decimalRate * 100;
			}
			return 0;
		});
	}, [rate]);

	return (
		<ul className='product-ratings'>
			{productRate.map((i, _) => (
				<div className='star-w' key={_}>
					<div className='empty'>
						<div className='star'></div>
					</div>
					<div className='full' style={{ width: `${i}%` }}>
						<div className='star'></div>
					</div>
				</div>
			))}
			{totalNumberOfRate && (
				<span className='total-number-of-rate'>({totalNumberOfRate})</span>
			)}
			<div className='rating-image'>
				<FontAwesomeIcon icon={faCameraRetro} />
			</div>
		</ul>
	);
};

export default ProductRate;

import React, { FC } from 'react';
import styles from './ProductSearchCriteriaBox.module.scss';
import useToggle from 'hooks/useToggle';

type ProductSearchCriteriaBoxProps = {};

type ProductFilterOption = {
	type: string;
	options: string[] | number[] | boolean[];
	hasFilterBar?: boolean;
	hasRange?: boolean;
};

const productFilterOptions: ProductFilterOption[] = [
	{
		type: 'gender',
		options: ['Man', 'Woman', 'Children', 'Unisex'],
	},
	{
		type: 'brand',
		options: ['Nike', 'Adidas', 'Puma', 'Reebok'],
		hasFilterBar: true,
	},
	{
		type: 'size',
		options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
	},
	{
		type: 'color',
		options: [
			'Red',
			'Blue',
			'Green',
			'Yellow',
			'Cream',
			'Black',
			'White',
			'Brown',
			'Orange',
			'Pink',
			'Purple',
			'Grey',
			'Beige',
			'Silver',
			'Gold',
			'Multicolor',
		],
		hasFilterBar: true,
	},
	{
		type: 'price',
		options: ['0-100', '100-500', '500-1000', '1000-10000', '10000+'],
		hasRange: true,
	},
];

const ProductSearchCriteriaBox: FC<ProductSearchCriteriaBoxProps> = () => {
	return (
		<div className={styles.search__aggregation__container}>
			{productFilterOptions.map((option, _) => (
				<SearchFieldBox key={_} title={option.type} options={option.options} />
			))}
		</div>
	);
};

type SearchFieldBoxProps = {
	title: string;
	options: string[] | number[] | boolean[];
};

const SearchFieldBox: FC<SearchFieldBoxProps> = ({ title, options }) => {
	const [isSearchFieldActive, toggleSearchField] = useToggle(false);

	return (
		<div className={styles.filters__wrapper}>
			<div className={styles.filter__title}>
				<span>{title}</span>
			</div>

			<div className={styles.filter__aggregation__container}>
				<ul className={styles.filter__options__list}>
					{options.map((option, _) => (
						<li key={_} className={`${styles.filter__option} option-${_}`}>
							<input
								type='checkbox'
								id={`${option}`}
								className={styles.option__checkbox}
							/>
							<span className={styles.option__title}>{option}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProductSearchCriteriaBox;

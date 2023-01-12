import React from 'react';
import { Icon } from '@iconify/react';
import styles from './Searchbox.module.scss';

const SearchBar = () => {
	return (
		<div className={styles.navbar__search__cont}>
			<input type='text' placeholder='Search for anything...' />
			<Icon icon='material-symbols:search-rounded' className={styles.searchbar__icon} />
		</div>
	);
};

export default SearchBar;

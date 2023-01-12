import React from 'react';
import styles from './PageNotFound.module.scss';
import Illustration from './Illustration';
const PageNotFound = () => {
	return (
		<div className={styles.notfound__wrapper}>
			<div className={styles.notfound__info}>
				<h3>The content you are looking for is currently unavailable.</h3>
				<h3>Would you like to leave right away and have a look at the following?</h3>
			</div>
			<Illustration className={styles.notfound__illustration} />
		</div>
	);
};

export default PageNotFound;

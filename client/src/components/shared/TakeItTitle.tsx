import React from 'react';
import styles from './Shared.module.scss';

const TakeItTitle: React.FC = () => {
	return (
		<div className={styles.takeit_title_cont}>
			<h3>
				Take<b>It</b>
			</h3>
		</div>
	);
};

export default TakeItTitle;

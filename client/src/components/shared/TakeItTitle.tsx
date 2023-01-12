import React from 'react';
import styles from './Shared.module.scss';

type Props = {
	size?: string | undefined;
};

const TakeItTitle: React.FC<Props> = ({ size }) => {
	return (
		<div className={`${styles.takeit_title_cont} ${styles[size || 'md']}`}>
			<h3>
				Take<b>It</b>
			</h3>
		</div>
	);
};

export default TakeItTitle;

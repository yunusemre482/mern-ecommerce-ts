import * as React from 'react';
import takeItLogo from 'assets/images/takeit-transparent-bg.png';
import styles from './Shared.module.scss';

const TakeItLogo: React.FC = () => {
	return (
		<div className={styles.takeit_logo_cont}>
			<img src={takeItLogo} alt='takeIt-logo' />
		</div>
	);
};

export default TakeItLogo;

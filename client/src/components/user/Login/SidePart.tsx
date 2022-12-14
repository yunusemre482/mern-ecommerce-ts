import React from 'react';
import sideImage from 'assets/images/ecommerce.png';
import styles from './Login.module.scss';
import Logo from 'components/shared/TakeItLogo';
import TakeItTitle from 'components/shared/TakeItTitle';
const SideImage = () => {
	return (
		<div className={styles.side_image_container}>
			<TakeItTitle />
			<img src={sideImage} alt='takeIt-side' className={styles.side_image} />
			<div className={styles.login_side_description}>
				<span className={styles.desc_first_part}>Don't think </span>
				<span className={styles.desc_second_part}>
					just take <b></b>
					<b>it</b>
				</span>
			</div>
		</div>
	);
};

export default SideImage;

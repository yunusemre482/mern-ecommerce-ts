import React from 'react';
import styles from './Navbar.module.scss';
import SearchBox from './SearchBox';
import TakeItTitle from 'components/shared/TakeItTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logoRemovedBg from 'assets/images/takeit-transparent-bg.png';
const NAV_DATA = [
	{
		title: 'Wishlist',
		path: '/wishlist',
		icon: faHeart,
	},
	{
		title: 'Cart',
		path: '/cart',
		icon: faShoppingCart,
	},
	{
		title: 'Account',
		path: '/account',
		icon: faUser,
	},
];

const Navbar = () => {
	return (
		<div className={styles.navbar__container}>
			<Link to='/'>
				<img src={logoRemovedBg} alt='TakeIt Logo' width={80} height={50} />
			</Link>
			<SearchBox />
			{/* Navbar Menu */}
			<ul className={styles.navbar__menu}>
				{NAV_DATA.map((item, index) => (
					<li key={index} className={styles.menu__item}>
						<Link to={item.path}>
							<FontAwesomeIcon icon={item.icon} />
							<span className={styles.menu__item__title}>{item.title}</span>
						</Link>
					</li>
				))}
			</ul>
			<div className={styles.divider} />
			<div className={styles.navbar__avatar}>
				<img
					src='https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'
					alt='Avatar'
					width={40}
					height={40}
				/>
			</div>

			{/* Avatar Section*/}
		</div>
	);
};

export default Navbar;

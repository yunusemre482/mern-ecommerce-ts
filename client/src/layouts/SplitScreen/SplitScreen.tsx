import React, { FC, ReactNode } from 'react';
import styles from './SplitScreen.module.scss';
import classnames from 'classnames';

type Props = {
	left: ReactNode;
	right: ReactNode;
};

const SplitScreen: FC<Props> = ({ left, right }) => {
	return (
		<div className={classnames(styles.split_screen_container)}>
			<div className={classnames(styles.pane)}>{left}</div>
			<div className={classnames(styles.pane)}>{right}</div>
		</div>
	);
};

export default SplitScreen;

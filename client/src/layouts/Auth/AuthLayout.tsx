import React from 'react';
import styles from './AuthLayout.module.scss';
import AuthIllustration from './AuthIllustration';
type Props = {
	children?: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className={styles.auth__layout}>
			<div className={styles.pane}>{children}</div>
			<div className={styles.pane}>
				<AuthIllustration />
			</div>
		</div>
	);
};

export default AuthLayout;

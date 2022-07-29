import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;

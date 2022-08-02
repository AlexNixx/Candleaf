import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import styles from "../styles/Header.module.scss";
import logo from "../public/header-logo.svg";
import { useEffect, useState } from "react";
import { useStateContext } from "../lib/context";

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState(false);
	const { totalQty } = useStateContext();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={
				headerScroll ? `${styles.header} ${styles.headerActive}` : styles.header
			}
		>
			<Link href="/">
				<Image src={logo} height={50} width={150} className={styles.logo} />
			</Link>
			<nav className={styles.nav}>
				<ul>
					<Link href="/discovery">
						<li>Discovery</li>
					</Link>
					<Link href="/about">
						<li>About</li>
					</Link>
					<Link href="/constact">
						<li>Contact us</li>
					</Link>
				</ul>
			</nav>
			<div className={styles.user_action}>
				<FaUserCircle />
				<Link href="/cart">
					<div className={styles.basket}>
						<FiShoppingBag />
						{totalQty > 0 && <span>{totalQty}</span>}
					</div>
				</Link>
			</div>
		</header>
	);
};

export default Header;

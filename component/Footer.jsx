import logo from "../public/footer-logo.svg";
import Image from "next/image";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.line}></div>
			<div className={styles.wrapper}>
				<div className={styles.logo_constainer}>
					<div className={styles.logo}>
						<Image
							src={logo}
							height={100}
							width={200}
							className={styles.logo_svg}
						/>
					</div>
					<p className={styles.desc}>
						Your natural candle made for
						<br />
						your home and for your wellness.
					</p>
				</div>
				<div className={styles.nav}>
					<ul>
						<li>Discovery</li>
						<li>New season</li>
						<li>Most searched</li>
						<li>Most selled</li>
					</ul>
					<ul>
						<li>About</li>
						<li>Help</li>
						<li>Shipping</li>
						<li>Affiliate</li>
					</ul>
					<ul>
						<li>Info</li>
						<li>Contact us</li>
						<li>Privacy Policies</li>
						<li>Terms &amp; Conditions</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

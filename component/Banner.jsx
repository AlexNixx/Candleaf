import styles from "../styles/Banner.module.scss";

const Banner = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<h1 className={styles.title}>
					🌱
					<br />
					The nature candle
				</h1>
				<p className={styles.desc}>
					All handmade with natural soy wax, Candleaf is a companion for all
					<br />
					your pleasure moments
				</p>
				<button className={styles.button}>Discovery our collection</button>
			</div>
		</div>
	);
};

export default Banner;

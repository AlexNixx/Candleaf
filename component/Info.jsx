import Image from "next/image";
import photo from "../public/info-image.jpg";
import styles from "../styles/Info.module.scss";

const Info = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<h1 className={styles.title}>
					Clean and <br />
					fragrant soy wax
				</h1>
				<p className={styles.desc}>Made for your home and for your wellness</p>
				<ul className={styles.list}>
					<li>
						<span>Eco-sustainable:</span> All recyclable materials, 0% CO2
						emissions
					</li>
					<li>
						<span>Hyphoallergenic:</span> 100% natural, human friendly
						ingredients
					</li>
					<li>
						<span>Handmade:</span> All candles are craftly made with love.
					</li>
					<li>
						<span>Long burning:</span> No more waste. Created for last long.
					</li>
				</ul>
				<button className={styles.button}>Learn more</button>
			</div>
			<Image src={photo} height={350} width={475} className={styles.image} />
		</div>
	);
};

export default Info;

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Product.module.scss";

const Product = ({ product }) => {
	//Extract the info from props
	const { title, price, image, slug } = product.attributes;
	return (
		<Link href={`/product/${slug}`}>
			<div className={styles.wrapper}>
				<div className={styles.img_conteiner}>
					<Image
						src={image.data.attributes.formats.large.url}
						alt={title}
						width={70}
						height={100}
						quality={100}
					/>
				</div>
				<div className={styles.info_container}>
					<h3 className={styles.title}>{title}</h3>
					<h2 className={styles.price}>{price}$</h2>
				</div>
			</div>
		</Link>
	);
};

export default Product;

import { useRouter } from "next/router";
import { useQuery } from "urql";
import Image from "next/image";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import styles from "../../styles/ProductDetails.module.scss";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateContext } from "../../lib/context";

const ProductDetails = () => {
	//Use state
	const { qty, setQty, increaseQty, decreaseQty, onAdd } = useStateContext();

	useEffect(() => {
		setQty(1);
	}, []);

	//Fetch slug
	const { query } = useRouter();
	//Fetch Graphql data
	const [result] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = result;

	//Cheack for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no.... {error.message}</p>;

	const { title, image, price, description, inStock } =
		data.products.data[0].attributes;

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<div className={styles.image_container}>
					<Image
						src={image.data.attributes.formats.medium.url}
						height={200}
						width={140}
						className={styles.image}
					/>
				</div>
				<p>{description}</p>
				<span>🚚 FREE SHIPPING</span>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{title} Candleaf®</h1>
				<span className={styles.price}>$ {price}</span>
				<span className={styles.qty_title}>Quantity</span>

				<div className={styles.user_action}>
					<div className={styles.qty_container}>
						<button onClick={decreaseQty}>-</button>
						<span>{qty}</span>
						<button onClick={increaseQty}>+</button>
					</div>

					<button
						className={
							inStock
								? `${styles.button}`
								: `${styles.button} ${styles.button_disable}`
						}
						disabled={!inStock}
						onClick={() => {
							onAdd(data.products.data[0].attributes, qty);
							setQty(1);
						}}
					>
						<AiOutlineShoppingCart />+ Add to cart
					</button>
				</div>

				<div className={styles.product_info}>
					<p>
						<span>Wax:</span> Top grade Soy wax that delivers a smoke less,
						consistent burn <span>Fragrance:</span> Premium quality ingredients
						with natural essential oils <span>Burning Time:</span> 70-75 hours{" "}
						<span>Dimension:</span> 10cm x 5cm <span>Weight:</span> 400g{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

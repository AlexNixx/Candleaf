import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "./Product";
import styles from "../styles/ProductGrid.module.scss";

const ProductsGrid = () => {
	//Fetch products from strapi
	const [result] = useQuery({ query: PRODUCT_QUERY });
	const { data, fetching, error } = result;

	//Cheack for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no.... {error.message}</p>;

	const products = data.products.data;

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Products</h1>
			<p className={styles.desc}>Order it for you or for your beloved ones </p>
			<div className={styles.container}>
				{products.map((product) => (
					<Product product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductsGrid;

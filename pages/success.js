import { useRouter } from "next/router";
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import formatMoney from "../lib/formatMoney";
import styles from "../styles/Success.module.scss";

const Success = ({ order }) => {
	const route = useRouter();

	return (
		<div className={styles.wrapper}>
			<div className={styles.order_info}>
				<h1>Thank you for your order!</h1>
				<h2>A confirmation email has been sent to</h2>
				<h2>
					<span>{order.customer_details.email}</span>
				</h2>
				<div className={styles.shipping_address}>
					<h2>Address</h2>
					{Object.entries(order.customer_details.address).map(
						([key, value]) => (
							<p key={key} className={styles.address_line}>
								{key} : <span>{value}</span>
							</p>
						)
					)}
				</div>
				<div className={styles.product_list}>
					<h2>Products</h2>
					{order.line_items.data.map((item) => (
						<div key={item.id} className={styles.order_product}>
							<h3>Product: {item.description}</h3>
							<span>Quantity: {item.quantity}</span>
							<span>Price: {formatMoney(item.price.unit_amount)}</span>
						</div>
					))}
				</div>
				<button className={styles.button} onClick={() => route.push("/")}>
					Continue Shopping
				</button>
			</div>
		</div>
	);
};

export async function getServerSideProps(params) {
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ["line_items"], //line_items not included by default
		}
	);
	return {
		props: { order },
	};
}

export default Success;

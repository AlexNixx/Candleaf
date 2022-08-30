import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Cart.module.scss";
import { useStateContext } from "../lib/context";
import getStripe from "../lib/getStripe";

const Cart = () => {
	const { cartItems, onAdd, onRemove, totalPrice } = useStateContext();

	//payment
	const handleCheckout = async () => {
		const stripePromise = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});
		try {
			const data = await response.json();
			await stripePromise.redirectToCheckout({ sessionId: data.id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Your cart items</h1>
			<Link href="/">
				<p className={styles.link}>Back to shopping</p>
			</Link>
			{cartItems.length >= 1 ? (
				<div>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((product) => (
								<tr>
									<td className={styles.product}>
										<div className={styles.img_container}>
											<Image
												src={product.image.data.attributes.formats.medium.url}
												height={100}
												width={70}
											/>
										</div>
										<div className={styles.product_info}>
											<h1 className={styles.product_title}>
												{product.title} Candleaf®
											</h1>
											<button className={styles.button_remove}>Remove</button>
										</div>
									</td>
									<td className={styles.price}>
										<span>$ {product.price}</span>
									</td>
									<td className={styles.qty}>
										<div className={styles.qty_container}>
											<button onClick={() => onRemove(product)}>-</button>
											<span>{product.quantity}</span>
											<button onClick={() => onAdd(product, 1)}>+</button>
										</div>
									</td>
									<td className={styles.total}>
										<span>
											$ {(product.price * product.quantity).toFixed(2)}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.check_out}>
						<div className={styles.container}>
							<div className={styles.total}>
								<h1>Sub-total</h1>
								<span>$ {totalPrice.toFixed(2)}</span>
							</div>
							<p className={styles.desc}>
								Tax and shipping cost will be calculated later
							</p>
						</div>
						<button
							className={styles.button_check_out}
							onClick={handleCheckout}
						>
							Check-out
						</button>
					</div>
				</div>
			) : (
				<span>Order smng</span>
			)}
		</div>
	);
};

export default Cart;

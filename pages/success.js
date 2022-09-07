import { useRouter } from "next/router";
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import formatMoney from "../lib/formatMoney";

const Success = ({ order }) => {
	const route = useRouter();
	console.log(order);
	return (
		<div>
			<div>
				<h1>Thank you for your order!</h1>
				<h2>A confirmation email has been sent to</h2>
				<h2>{order.customer_details.email}</h2>
				<div>
					<h2>address</h2>
					{/* <h3>addres info</h3> */}
					{Object.entries(order.customer_details.address).map(
						([key, value]) => (
							<p key={key}>
								{key} : {value}
							</p>
						)
					)}
				</div>
				<div>
					<h2>product</h2>
					{order.line_items.data.map((item) => (
						<div key={item.id}>
							<h3>Product: {item.description}</h3>
							<span>Quantity: {item.quantity}</span>
							<span>Price: {formatMoney(item.price.unit_amount)}</span>
						</div>
					))}
				</div>
				<button onClick={() => route.push("/")}>Continue Shopping</button>
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

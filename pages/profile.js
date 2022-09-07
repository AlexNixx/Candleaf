import { useRouter } from "next/router";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

import formatDate from "../lib/formatData";
import formatMoney from "../lib/formatMoney";

const profile = ({ user, orders }) => {
	const route = useRouter();
	console.log(orders);
	return (
		user && (
			<div>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<div>
					{orders.map((order) => (
						<div>
							<h1>Order Name: {order.id}</h1>
							<h2>{formatMoney(order.amount)}</h2>
							<h2>Data: {formatDate(order.created)}</h2>
						</div>
					))}
				</div>
				<button onClick={() => route.push("/api/auth/logout")}>Logout</button>
			</div>
		)
	);
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const session = getSession(context.req, context.res);
		const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
		const paymentIntents = await stripe.paymentIntents.list({
			customer: stripeId,
		});
		return {
			props: {
				orders: paymentIntents.data,
			},
		};
	},
});

export default profile;

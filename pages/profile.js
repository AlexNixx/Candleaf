import { useRouter } from "next/router";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import formatDate from "../lib/formatData";
import formatMoney from "../lib/formatMoney";
import styles from "../styles/Profile.module.scss";

const profile = ({ user, orders }) => {
	const route = useRouter();

	return (
		user && (
			<div className={styles.wrapper}>
				<h2 className={styles.user_name}>{user.name}</h2>
				<h4 className={styles.user_mail}>{user.email}</h4>
				{!orders.length && (
					<h2 className={styles.order_toggle}>
						You don't have order history yet
					</h2>
				)}
				{orders.length > 0 && (
					<>
						<span className={styles.oders_title}>Orders: </span>
						<div className={styles.orders}>
							{orders.map((order) => (
								<div className={styles.order}>
									<h2 className={styles.order_date}>
										Data: {formatDate(order.created)}
									</h2>
									<h2 className={styles.order_name}>
										Order number: <span>{order.id}</span>
									</h2>
									<h2 className={styles.order_amount}>
										Order amount: {formatMoney(order.amount)}
									</h2>
								</div>
							))}
						</div>
					</>
				)}

				<button
					onClick={() => route.push("/api/auth/logout")}
					className={styles.button}
				>
					Logout
				</button>
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

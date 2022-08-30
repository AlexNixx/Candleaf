import Layout from "../component/Layout";
import Head from "next/head";
import { Provider, createClient } from "urql";
import { StateContext } from "../lib/context";
import "../styles/globals.scss";

// const client = createClient({ url: "http://localhost:1337/graphql" });
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Candleaf Shop</title>
			</Head>
			<StateContext>
				<Provider value={client}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</StateContext>
		</>
	);
}

export default MyApp;

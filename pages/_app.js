import Layout from "../component/Layout";
import Head from "next/head";
import { Provider, createClient } from "urql";
import "../styles/globals.css";

const client = createClient({ url: "http://localhost:1337/graphql" });

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Candleaf Shop</title>
			</Head>
			<Provider value={client}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	);
}

export default MyApp;

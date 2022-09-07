import Layout from "../component/Layout";
import Head from "next/head";
import { Provider, createClient } from "urql";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";
import "../styles/globals.scss";

// const client = createClient({ url: "http://localhost:1337/graphql" });
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Candleaf Shop</title>
			</Head>
			<UserProvider>
				<StateContext>
					<Provider value={client}>
						<Toaster />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</StateContext>
			</UserProvider>
		</>
	);
}

export default MyApp;

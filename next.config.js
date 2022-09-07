/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["res.cloudinary.com"],
	},
	async redirects() {
		return [
			{
				source: "/canceled",
				destination: "/",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;

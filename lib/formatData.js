export default function formatDate(time = 0) {
	const date = new Date(time * 1000);

	return date.toLocaleString("en-US");
}

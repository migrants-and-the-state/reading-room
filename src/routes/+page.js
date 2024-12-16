export async function load({ url }) {
	const vUrl = new URL(url.href);
	const searchParams = new URLSearchParams(vUrl.search);
	return {
		props: { searchParams }
	};
}

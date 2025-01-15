import afiles from '$lib/data/afiles.json';

export async function load({ params }) {
	const afile = afiles.find((file) => file['id'] === params.anum);
	const pageIndex = parseInt(params.pageslug) || 0;

	if (!afile) {
		return { status: 404, error: new Error(`Afile not found`) };
	} else {
		const resp = await fetch(afile.manifest_url);
		const json = await resp.json();
		const canvases = json.sequences[0].canvases;
		const canvas = canvases[pageIndex] || canvases[0];

		return {
			props: {
				afile: afile,
				canvasId: canvas['@id']
			}
		};
	}
}

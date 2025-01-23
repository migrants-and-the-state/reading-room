import { error } from '@sveltejs/kit';
import afiles from '$lib/data/afiles.json';

export async function load({ params }) {
	const afile = afiles.find((file) => file['id'] === params.anum);
	const pageIndex = parseInt(params.pageslug) || 0;

	if (!afile) {
		error(404, 'Not Found');
	} else {
		console.log(afile);
		const og_id = 'og-2023-kc-nara';
		const manifest_url = `https://mats-aperitiiif-presenation-api-store-v1.s3.us-east-1.amazonaws.com/${og_id}/${afile.id}/manifest.json`;
		const resp = await fetch(manifest_url);
		const json = await resp.json();
		const canvases = json.sequences[0].canvases;
		const canvas = canvases[pageIndex] || canvases[0];

		return {
			props: {
				afile: afile,
				manifest_url: manifest_url,
				canvasId: canvas['@id']
			}
		};
	}
}

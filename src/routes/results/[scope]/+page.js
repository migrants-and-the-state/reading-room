import { error } from '@sveltejs/kit';
import { validScopes } from '$lib/scope';
import { base } from '$app/paths';

export async function load({ url, params }) {
	const vUrl = new URL(url.href);
	const searchParams = new URLSearchParams(vUrl.search);
	const scope = params.scope;

	if (validScopes.includes(scope)) {
		const jsonPath = `${base}/api/index/${scope}.json`;
		const resp = await fetch(jsonPath);
		const results = await resp.json() || [];
		return {
			scope: scope,
			results: results,
			searchParams: searchParams
		};
	} else {
		error(404, 'Not Found');
	}
}

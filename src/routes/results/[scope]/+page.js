import { error } from '@sveltejs/kit';
import { validScopes } from '$lib/scope';
import { search } from '$lib/search';

export async function load({ url, params }) {
	const vUrl = new URL(url.href);
	const searchParams = new URLSearchParams(vUrl.search);
	const scope = params.scope;

	if (validScopes.includes(scope)) {
		const results = await search(scope, searchParams);
		console.log('results', results);
		return {
			url: url.href,
			scope: scope,
			results: results
		};
	} else {
		error(404, 'Not Found');
	}
}

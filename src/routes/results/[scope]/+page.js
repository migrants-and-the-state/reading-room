import { error } from '@sveltejs/kit';
import { validScopes } from '$lib/scope';

export async function load({ url, params }) {
	const vUrl = new URL(url.href);
	const searchParams = new URLSearchParams(vUrl.search);
	const scope = params.scope;
	if (validScopes.includes(scope)) {
		return {
			scope: scope,
			searchParams: searchParams
		};
	} else {
		error(404, 'Not Found');
	}
}

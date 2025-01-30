import { goto } from '$app/navigation';

export const validScopes = ['afile', 'page', 'g325a', 'natcert'];

export function getScopeIndex(scope) {
	return validScopes.indexOf(scope) !== -1 ? validScopes.indexOf(scope) : 0;
}

export function updateScopeIndex(index) {
	const newScope = validScopes[index];
	goto(`?tab=${newScope}`, { replaceState: true, invalidateAll: true })
}

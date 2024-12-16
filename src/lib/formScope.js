import { goto } from '$app/navigation';

const validScopes = ['afile', 'page', 'g325a', 'natcert'];

export function getScopeIndex(scope) {
  return validScopes.indexOf(scope) !== -1 ? validScopes.indexOf(scope) : 0;
}

export function updateScopeIndex(index, page) {
  const newScope = validScopes[index];
  page.url.searchParams.set('scope', newScope);
  goto(`?${page.url.searchParams.toString()}`);
}


import { goto } from '$app/navigation';
import { base } from '$app/paths';
import MiniSearch from 'minisearch';

//A10712 A2870

const pMiniConfig = {
	fields: ['id', 'full_text'], // fields to index for full-text search
	storeFields: ['id', 'anumber', 'full_text', 'fields'] // fields to return with search results
};

const aMiniConfig = {
	fields: ['id'], // fields to index for full-text search
	storeFields: ['id', 'fields'] // fields to return with search results
};

export async function search(scope, searchParams) {
	const jsonPath = `${base}/api/index/${scope}.json`
	const miniSearch = new MiniSearch(scope == 'afile' ? aMiniConfig : pMiniConfig); 
	const query = searchParams.get('query') || MiniSearch.wildcard;
	const results = await fetch(jsonPath)
			.then(resp => resp.json())
			.then(data => {
				miniSearch.addAll(data);
				console.log('miniSearch', miniSearch);
				return miniSearch.search(query, { prefix: true, combine: 'AND', fuzzy: 0.1 });
			})
			.catch(err => console.error(err));
	return results;
}


export function handleSubmit(event) {
	event.preventDefault();
	localStorage.setItem('formReferrer', window.location.href);
	const data = new FormData(event.target);
	const scope = event.target.attributes['scope'].value;
	const formValues = {};

	for (const [key, value] of data) {
		if (Object.prototype.hasOwnProperty.call(formValues, key)) {
			formValues[key] = [].concat(formValues[key], value);
		} else {
			formValues[key] = value;
		}
	}
	const queryString = new URLSearchParams(formValues).toString();	
	goto(`${base}/results/${scope}?${queryString}`);
}

import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { fieldMap } from '$lib/fields';
import MiniSearch from 'minisearch';

function pMiniConfig(selectedFields) {
	return {
		fields: selectedFields, //fields to index for full-text search 
		extractField: (document, fieldName) => {
			return fieldName.split('.').reduce((doc, key) => {
				const intKey = parseInt(key, 10)
				return doc && doc[isNaN(intKey) ? key : intKey]
			}, document)
		},
		storeFields: ['id', 'anumber', 'page_index', 'full_text', 'fields'] // fields to return with search results
	}
};

function aMiniConfig(selectedFields) {
	return {
		fields: selectedFields, // fields to index for full-text search
		extractField: (document, fieldName) => {
			return fieldName.split('.').reduce((doc, key) => {
				const intKey = parseInt(key, 10)
				return doc && doc[isNaN(intKey) ? key : intKey]
			}, document)
		},
		storeFields: ['id', 'fields'] // fields to return with search results
	};
}

export async function search(scope, searchParams) {
	const jsonPath = `${base}/api/index/${scope}.json`
	const selectedFields = searchParams.getAll('selectedFields').map((field) => ( fieldMap[scope][field]['keypath'] ));
	const miniSearch = new MiniSearch(scope == 'afile' ? aMiniConfig(selectedFields) : pMiniConfig(selectedFields)); 
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
  const params = new URLSearchParams(data);
	goto(`${base}/results/${scope}?${params.toString()}`);
}

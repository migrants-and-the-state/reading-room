import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { fields } from '$lib/fields';
import MiniSearch from 'minisearch';

function pMiniConfig(selectedFields) {
	return {
		fields: selectedFields, //fields to index for full-text search
		extractField: (document, fieldName) => {
			return fieldName.split('.').reduce((doc, key) => {
				const intKey = parseInt(key, 10);
				return doc && doc[isNaN(intKey) ? key : intKey];
			}, document);
		},
		storeFields: ['id', 'anumber', 'page_index', 'full_text', 'fields'] // fields to return with search results
	};
}

function aMiniConfig(selectedFields) {
	return {
		fields: selectedFields, // fields to index for full-text search
		extractField: (document, field) => {
			console.log('f', field);
			return field.split('.').reduce((doc, key) => {
				const intKey = parseInt(key, 10);
				return doc && doc[isNaN(intKey) ? key : intKey];
			}, document);
		},
		storeFields: ['id', 'fields', 'page_count'] // fields to return with search results
	};
}

export async function search(scope, searchParams) {
	const jsonPath = `${base}/api/index/${scope}.json`;
	const selectedFields = searchParams
		.getAll('selectedFields')
		.filter((field) => fields[scope].some((f) => f.id === field));
	const miniSearch = new MiniSearch(
		scope == 'afile' ? aMiniConfig(selectedFields) : pMiniConfig(selectedFields)
	);
	const query = searchParams.get('query') || MiniSearch.wildcard;
	const results = await fetch(jsonPath)
		.then((resp) => resp.json())
		.then((data) => {
			miniSearch.addAll(data);
			console.log('miniSearch', miniSearch);

			return miniSearch.search(query, { prefix: true, combineWith: 'AND', fuzzy: 0.2 });
		})
		.catch((err) => console.error(err));
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

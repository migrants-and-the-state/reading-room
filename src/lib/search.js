import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { fields } from '$lib/fields';
import MiniSearch from 'minisearch';

function dotExtractField(document, fieldName) {
	return fieldName.split('.').reduce((doc, key) => {
		const intKey = parseInt(key, 10);
		return doc && doc[isNaN(intKey) ? key : intKey];
	}, document);
}

function pMiniConfig(selectedFields) {
	return {
		fields: selectedFields,
		extractField: (document, fieldName) => {
			return dotExtractField(document, fieldName);
		},
		storeFields: ['id', 'anumber', 'page_index', 'full_text', 'fields']
	};
}

function aMiniConfig(selectedFields) {
	return {
		fields: selectedFields, // fields to index for full-text search
		extractField: (document, field) => {
			return field.split('.').reduce((doc, key) => {
				const intKey = parseInt(key, 10);
				return doc && doc[isNaN(intKey) ? key : intKey];
			}, document);
		},
		storeFields: ['id', 'fields', 'page_count'] // fields to return with search results
	};
}

export async function search(scope, searchParams) {
	const limitParams = Object.fromEntries(
		[...searchParams.entries()].filter(([key]) => key.startsWith('limit_'))
	);
	const jsonPath = `${base}/api/index/${scope}.json`;
	const selectedFields = searchParams
		.getAll('selectedFields')
		.filter((field) => fields[scope].some((f) => f.id === field));
	const miniSearch = new MiniSearch(
		scope == 'afile' ? aMiniConfig(selectedFields) : pMiniConfig(selectedFields)
	);
	const query = searchParams.get('query') || MiniSearch.wildcard;
	const results = await fetch(jsonPath)
		.then((response) => response.json())
		.then((data) => {
			miniSearch.addAll(data);
			let options = { prefix: true, combineWith: 'AND', fuzzy: 0.2 };
			if (Object.keys(limitParams).length > 0) {
				options.filter = (result) => {
					let res = Object.entries(limitParams).every(([key, value]) => {
						const field = key.replace('limit_', '');
						let fieldValue = dotExtractField(result, field);
						if (typeof fieldValue === 'string') {
							fieldValue = fieldValue.toLowerCase();
							value = value.toLowerCase();
						}
						return fieldValue === value;
					});
					return res;
				};
			}
			return miniSearch.search(query, options);
		})
		.catch((err) => console.error(err));
	return results;
}

export function handleSubmit(event) {
	event.preventDefault();
	localStorage.setItem('formReferrer', window.location.href);
	const scope = event.target.attributes['scope'].value;
	const data = new FormData(event.target);
	const cleanData = {};
	data.forEach((value, key) => {
		if (!key.startsWith('limit') || value !== 'any') {
			cleanData[key] = value;
		}
	});
	const params = new URLSearchParams(cleanData);
	goto(`${base}/results/${scope}?${params.toString()}`);
}

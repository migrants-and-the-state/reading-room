import { goto } from '$app/navigation';
import { base } from '$app/paths';

const FlexSearch = require('flexsearch');

const index = FlexSearch.Index({});

export function addDocument(id, content) {
	index.add(id, content);
}

export function search(query) {
	return index.search(query);
}

export function handleSubmit(event) {
	event.preventDefault();
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
	console.log('form values: ', formValues);
	goto(`${base}/results/${scope}?${queryString}`);
}

import { afileFields } from '$lib/fields/afile';
import { pageFields } from '$lib/fields/page';
import { g325aFields } from '$lib/fields/g325a';
import { natcertFields } from '$lib/fields/natcert';

export const fields = {
	afile: afileFields,
	page: pageFields,
	g325a: [...pageFields, ...g325aFields],
	natcert: [...pageFields, ...natcertFields],
	xPage: [...pageFields, ...g325aFields, ...natcertFields]
};

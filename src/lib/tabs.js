import { goto } from '$app/navigation';

const validTabs = ['afile', 'page', 'g325a', 'natcert'];

export function getTabIndex(tab) {
	return validTabs.indexOf(tab) !== -1 ? validTabs.indexOf(tab) : 0;
}

export function updateTabIndex(index) {
	const newTab = validTabs[index];
	goto(`?tab=${newTab}`);
}

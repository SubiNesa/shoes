import type { Item } from '$lib/types/app.definitions';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const res = await fetch('/data.json');
	const items: Item[] = await res.json();

	let queries = url.searchParams.get('shoes');
	let ids: number[] = [];

	if (queries) {
		ids = queries.split(',').map((str) => +str);
	}

	return { items: items.filter((item) => ids.includes(item.id)) };
};

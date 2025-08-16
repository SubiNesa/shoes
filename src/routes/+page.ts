import type { Item } from '$lib/types/app.definitions';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/data.json');
	const items: Item[] = await res.json();
	return { items: items.sort((a, b) => b.size - a.size) };
};

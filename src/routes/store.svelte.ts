export const KEY = 'my:shoes';
let cart: number[] = $state([]);

export function get() {
	return cart;
}

export function init() {
	const data = localStorage.getItem(KEY);
	const stored = new Set(data ? JSON.parse(data) : []);
	cart = Array.from(stored) as number[];
}

export function set(id: number) {
	const data = localStorage.getItem(KEY);
	const stored = new Set(data ? JSON.parse(data) : []);
	stored.add(id);
	cart = Array.from(stored) as number[];
	localStorage.setItem(KEY, JSON.stringify(cart));
}

export function remove(id: number) {
	const data = localStorage.getItem(KEY);
	const stored = new Set(data ? JSON.parse(data) : []);
	stored.delete(id);
	cart = Array.from(stored) as number[];
	localStorage.setItem(KEY, JSON.stringify(cart));
}

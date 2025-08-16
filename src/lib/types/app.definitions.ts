export interface Item {
	id: number;
	name: string;
	size: number;
	photo: string;
}

export interface PageProps {
	data: {
		items: Item[];
	};
}

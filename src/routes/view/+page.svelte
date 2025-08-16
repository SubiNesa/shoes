<script lang="ts">
	import type { PageProps } from '$lib/types/app.definitions';
	import { Card } from 'flowbite-svelte';

	let { data }: PageProps = $props();
</script>

<section>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.items as item}
			<Card img="/{item.photo}">
				<div class="m-2">
					<h5 class="text-xl font-semibold tracking-tight text-gray-900">{item.name}</h5>
					<p class="font-normal text-gray-700">Size: {item.size}</p>
				</div>
			</Card>
		{/each}
	</div>
</section>

<script lang="ts">
	import { Card, Button, Range, Label } from 'flowbite-svelte';
	import { CartPlusAltOutline, CircleMinusSolid } from 'flowbite-svelte-icons';
	import { get, set, remove } from './store.svelte';
	import type { PageProps } from '$lib/types/app.definitions';

	let { data }: PageProps = $props();
	let minValue = $state(
		Math.min.apply(
			Math,
			data.items.map(function (event) {
				return event.size;
			})
		)
	);
	let maxValue = $state(
		Math.max.apply(
			Math,
			data.items.map(function (event) {
				return event.size;
			})
		)
	);
	const store: number[] = $derived(get());
	let modal: HTMLDivElement | null = null;

	const onPhoto = (photo: string) => {
		modal = document.createElement('div');
		modal.setAttribute('class', 'modal');
		//add the modal to the main section or the parent element
		window?.document?.querySelector('body').append(modal);
		//adding image to modal
		const newImage = document.createElement('img');
		newImage.setAttribute('src', photo);
		//creating the close button
		const closeBtn = document.createElement('b');
		closeBtn.setAttribute('class', 'closeBtn');
		closeBtn.innerHTML = 'X';
		//close function
		closeBtn.onclick = () => {
			modal?.remove();
		};
		modal.append(newImage, closeBtn);
	};
</script>

<svelte:head>
	<title>My shoes</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:body
	onkeydown={(data) => {
		if (data.key == 'Escape') {
			modal?.remove();
		}
	}}
/>

<section>
	<div class="grid grid-cols-1 gap-4 pb-10 md:grid-cols-2 lg:grid-cols-3">
		<div>
			<Label>Min: {minValue}</Label>
			<Range id="range-min" min="20" max="35" bind:value={minValue} />
		</div>
		<div>
			<Label>Max: {maxValue}</Label>
			<Range id="range-max" min="20" max="35" bind:value={maxValue} />
		</div>
	</div>
</section>
<section>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.items as item}
			{#if item.size >= minValue && item.size <= maxValue}
				<Card>
					<a
						href="#"
						onclick={(e) => {
							e.preventDefault();
							onPhoto(item.photo);
						}}
					>
						<img class="rounded-t-lg" src="/{item.photo}" alt="product 1" />
					</a>
					<div class="m-2">
						<h5 class="text-xl font-semibold tracking-tight text-gray-900">{item.name}</h5>
						<p class="font-normal text-gray-700">Size: {item.size}</p>
						{#if store.includes(item.id)}
							<Button size="xs" color="red" class="mt-4" onclick={() => remove(item.id)}
								><CircleMinusSolid class="mr-2" />Remove</Button
							>
						{:else}
							<Button size="xs" color="light" class="mt-4" onclick={() => set(item.id)}
								><CartPlusAltOutline class="mr-2" />Add</Button
							>
						{/if}
					</div>
				</Card>
			{/if}
		{/each}
	</div>
</section>

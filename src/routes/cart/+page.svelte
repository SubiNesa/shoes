<script lang="ts">
	import { page } from '$app/state';
	import { Card, Listgroup, Avatar, Button, Clipboard, Input, Alert } from 'flowbite-svelte';
	import { get, remove } from '../store.svelte';
	import { CircleMinusSolid, CheckOutline, BeerMugEmptyOutline } from 'flowbite-svelte-icons';
	import type { Item, PageProps } from '$lib/types/app.definitions';

	let { data }: PageProps = $props();
	const store: number[] = $derived(get());
	const list: Item[] = $derived(data.items.filter((item) => store.includes(item.id)));

	let value = $derived(`${page.url.origin}/view?shoes=${list.map((item) => item.id)}`);
	let success = $state(false);
</script>

<svelte:head>
	<title>My shoes | Card</title>
	<meta name="description" content="Card" />
</svelte:head>

{#if list.length > 0}
	<Card class="p-4 sm:p-8 md:p-10" size="xl">
		<div class="mb-4 flex items-center justify-between">
			<Input bind:value class="mr-2 w-full" />
			<Clipboard bind:value bind:success class="w-24" color="green">
				{#if success}<CheckOutline />{:else}Copy{/if}
			</Clipboard>
		</div>
		<Listgroup items={list} class="border-0 dark:bg-transparent!">
			{#snippet children(item)}
				<div class="flex items-center space-x-4 py-2 rtl:space-x-reverse">
					<Avatar src={item.photo} alt={item.name} class="h-28 w-38" cornerStyle="rounded" />
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
							{item.name}
						</p>
						<p class="truncate text-sm text-gray-500 dark:text-gray-400">
							{item.size}
						</p>
					</div>
					<Button size="xs" color="red" class="mt-4" onclick={() => remove(item.id)}
						><CircleMinusSolid class="mr-2" />Remove</Button
					>
				</div>
			{/snippet}
		</Listgroup>
	</Card>
{:else}
	<Alert color="yellow">
		{#snippet icon()}<BeerMugEmptyOutline class="h-5 w-5" />{/snippet}
		<span class="font-medium">Cart is empty!</span>
		Please add some shoes.
	</Alert>
{/if}

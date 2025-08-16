<script lang="ts">
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Indicator } from 'flowbite-svelte';
	import { CartOutline, ShoppingBagSolid } from 'flowbite-svelte-icons';
	let activeUrl = $derived(page.url.pathname);

	import { get } from './store.svelte';

	const store = $derived(get());
</script>

<Navbar>
	<NavBrand href="/">
		<ShoppingBagSolid class="h-10 w-10" />
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">My shoes</span
		>
	</NavBrand>

	<div class="flex md:order-2">
		{#if activeUrl !== '/view'}
			<div>
				<Indicator
					color="red"
					border
					size="xl"
					placement="top-right"
					class="cart-indicator text-xs font-bold text-white">{store.length}</Indicator
				>
				<a href="/cart" aria-current={activeUrl === '/cart' ? 'page' : undefined}>
					<CartOutline />
				</a>
			</div>
		{:else}
			<div></div>
		{/if}

		<NavHamburger />
	</div>
	<NavUl {activeUrl} class="order-1">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/cart">Cart</NavLi>
	</NavUl>
</Navbar>

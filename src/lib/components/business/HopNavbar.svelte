<script lang="ts">
	import { MAIN_MENU } from '$lib/config/navigation';
	import { page } from '$app/stores';
	import logo from '$lib/assets/hopnic-logo.svg';
	import { onMount } from 'svelte';

	let isOpen = $state(false);
	let globeIcon = $state('');
	let menuIcon = $state('');
	let xmarkIcon = $state('');

	function toggleMenu() {
		isOpen = !isOpen;
	}

	onMount(async () => {
		const [globe, menu, xmark] = await Promise.all([
			import('iconoir/icons/regular/globe.svg?raw'),
			import('iconoir/icons/regular/menu.svg?raw'),
			import('iconoir/icons/regular/xmark.svg?raw')
		]);
		globeIcon = globe.default;
		menuIcon = menu.default;
		xmarkIcon = xmark.default;
	});
</script>

<nav class="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md shadow-sm">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center gap-3 group">
					<img src={logo} alt="Hopnic" class="h-10 w-auto transition-transform group-hover:scale-105" />
					<span class="text-xl font-bold text-neutral-900 tracking-tight"></span>
				</a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-1">
					{#each MAIN_MENU as item}
						<a
							href={item.href}
							class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 {$page.url
								.pathname === item.href
								? 'text-neutral-900 bg-neutral-100'
								: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}"
						>
							{item.title}
						</a>
					{/each}
				</div>
			</div>

			<!-- Language Switcher (Desktop) -->
			<div class="hidden md:flex items-center ml-4">
				<button
					type="button"
					class="p-2.5 text-neutral-600 hover:text-neutral-900 transition-all duration-200 rounded-lg hover:bg-neutral-100"
					aria-label="Change Language"
				>
					{#if globeIcon}
						<span class="w-6 h-6 inline-block">
							{@html globeIcon}
						</span>
					{/if}
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="-mr-2 flex md:hidden">
				<button
					onclick={toggleMenu}
					type="button"
					class="inline-flex items-center justify-center rounded-lg p-2.5 text-neutral-900 hover:bg-neutral-100 focus:outline-none transition-all duration-200"
					aria-controls="mobile-menu"
					aria-expanded={isOpen}
				>
					<span class="sr-only">Open main menu</span>
					{#if !isOpen}
						{#if menuIcon}
							<span class="w-6 h-6 inline-block">
								{@html menuIcon}
							</span>
						{/if}
					{:else}
						{#if xmarkIcon}
							<span class="w-6 h-6 inline-block">
								{@html xmarkIcon}
							</span>
						{/if}
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="md:hidden border-t border-neutral-100 shadow-lg" id="mobile-menu">
			<div class="space-y-1 px-4 pb-4 pt-3 bg-white">
				{#each MAIN_MENU as item}
					<a
						href={item.href}
						class="block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 {$page.url.pathname ===
						item.href
							? 'bg-neutral-100 text-neutral-900'
							: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}"
						onclick={() => (isOpen = false)}
					>
						{item.title}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

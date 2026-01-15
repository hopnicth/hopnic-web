<script lang="ts">
	import type { Office } from '$lib/data/offices';
	import { onMount } from 'svelte';

	let { office } = $props<{ office: Office }>();

    // Default language is 'th' as per requirements
    // ideally this would come from a language store
    const lang = 'th';

	let mapPinIcon = $state('');
	let chatLinesIcon = $state('');
	let phoneIcon = $state('');

	onMount(async () => {
		const [mapPin, chatLines, phone] = await Promise.all([
			import('iconoir/icons/regular/map-pin.svg?raw'),
			import('iconoir/icons/regular/chat-lines.svg?raw'),
			import('iconoir/icons/regular/phone.svg?raw')
		]);
		mapPinIcon = mapPin.default;
		chatLinesIcon = chatLines.default;
		phoneIcon = phone.default;
	});
</script>

<div class="flex flex-col h-full bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
	<!-- Card Content -->
	<div class="p-8 flex-grow">
		<h3 class="text-2xl font-bold text-neutral-900 mb-3">{office.name[lang]}</h3>
		<p class="text-neutral-600 text-base leading-relaxed mb-6">
			{office.address[lang]}
		</p>
		<div class="flex items-center gap-2">
			<span class="text-neutral-500 font-medium text-sm">Tel:</span>
			<span class="text-neutral-900 font-semibold text-base">{office.phone}</span>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex border-t border-neutral-100 divide-x divide-neutral-100 bg-gradient-to-b from-neutral-50/50 to-neutral-50">
		<a
			href={office.googleMapUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex-1 flex flex-col items-center justify-center py-5 px-3 text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
		>
			{#if mapPinIcon}
				<span class="w-7 h-7 mb-2 text-neutral-400 group-hover:text-blue-600 transition-colors inline-block">
					{@html mapPinIcon}
				</span>
			{/if}
			<span class="text-xs font-semibold">Map</span>
		</a>

		<a
			href={office.lineUrl}
			target="_blank"
            rel="noopener noreferrer"
			class="flex-1 flex flex-col items-center justify-center py-5 px-3 text-neutral-600 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
		>
			{#if chatLinesIcon}
				<span class="w-7 h-7 mb-2 text-neutral-400 group-hover:text-green-600 transition-colors inline-block">
					{@html chatLinesIcon}
				</span>
			{/if}
			<span class="text-xs font-semibold">Add Line</span>
		</a>

		<a
			href="tel:{office.phone}"
			class="flex-1 flex flex-col items-center justify-center py-5 px-3 text-neutral-600 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 group"
		>
			{#if phoneIcon}
				<span class="w-7 h-7 mb-2 text-neutral-400 group-hover:text-amber-600 transition-colors inline-block">
					{@html phoneIcon}
				</span>
			{/if}
			<span class="text-xs font-semibold">Call Now</span>
		</a>
	</div>
</div>

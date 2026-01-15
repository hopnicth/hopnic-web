<script lang="ts">
	import { onMount } from 'svelte';

	let {
		name,
		size = 24,
		strokeWidth = 1.5,
		class: className = '',
		...props
	}: {
		name: string;
		size?: number;
		strokeWidth?: number;
		class?: string;
		[key: string]: any;
	} = $props();

	let svgContent = $state('');

	onMount(async () => {
		try {
			const iconModule = await import(`iconoir/icons/${name}.svg?raw`);
			svgContent = iconModule.default;
		} catch (error) {
			console.error(`Failed to load icon: ${name}`, error);
		}
	});
</script>

{#if svgContent}
	<span
		class="inline-flex items-center justify-center {className}"
		style="width: {size}px; height: {size}px;"
		{...props}
	>
		{@html svgContent}
	</span>
{/if}

<style>
	span :global(svg) {
		width: 100%;
		height: 100%;
		stroke-width: inherit;
	}
</style>


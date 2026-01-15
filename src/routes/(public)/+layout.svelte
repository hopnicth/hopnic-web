<script lang="ts">
	import '../../app.css';
	import HopNavbar from '$lib/components/business/HopNavbar.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-white text-neutral-900 font-sans">
	<HopNavbar />

	<main>
		{@render children()}
	</main>

	<footer class="py-12 bg-neutral-50 text-center text-sm text-neutral-400 border-t border-neutral-100">
		&copy; {new Date().getFullYear()} Hop Site
	</footer>
</div>

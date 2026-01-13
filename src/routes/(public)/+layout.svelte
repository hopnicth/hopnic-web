<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
	<nav class="p-4 bg-white shadow">
		<div class="container mx-auto flex justify-between items-center">
			<a href="/" class="text-xl font-bold text-primary">Hop Site</a>
			<!-- Placeholder for Nav -->
		</div>
	</nav>

	<main>
		{@render children()}
	</main>

	<footer class="p-4 bg-gray-100 text-center text-sm text-gray-500">
		&copy; {new Date().getFullYear()} Hop Site
	</footer>
</div>

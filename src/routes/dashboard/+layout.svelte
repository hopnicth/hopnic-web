<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { children } = $props();

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard', icon: '📊' },
		{ href: '/dashboard/projects', label: 'Projects', icon: '📁' }
	];
</script>

<svelte:head>
	<title>Dashboard - HOPNIC Admin</title>
</svelte:head>

<div class="min-h-screen bg-neutral-50">
	<!-- Top Navigation -->
	<nav class="bg-white border-b border-neutral-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-14">
				<!-- Left: Logo & Nav -->
				<div class="flex items-center gap-6">
					<a href="/dashboard" class="text-lg font-bold text-neutral-900">
						HOPNIC
					</a>

					<div class="flex items-center gap-1">
						{#each navItems as item}
							<a
								href={item.href}
								class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors {$page.url
									.pathname === item.href
									? 'bg-neutral-100 text-neutral-900 font-medium'
									: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}"
							>
								<span class="text-base">{item.icon}</span>
								{item.label}
							</a>
						{/each}
					</div>
				</div>

				<!-- Right: Actions -->
				<div class="flex items-center gap-3">
					<a
						href="/portfolio"
						target="_blank"
						class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
					>
						ดูเว็บไซต์ ↗
					</a>

					<span class="text-neutral-300">|</span>

					<form method="POST" action="/logout" use:enhance>
						<button
							type="submit"
							class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
						>
							ออกจากระบบ
						</button>
					</form>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		font-family: 'Bai Jamjuree', sans-serif;
	}
</style>


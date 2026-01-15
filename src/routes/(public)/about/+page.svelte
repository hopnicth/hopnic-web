<script lang="ts">
	import aboutData from '$lib/data/about.json';
	import OrganizationChart from '$lib/components/business/OrganizationChart.svelte';

	// Placeholder images - in production these should be replaced with real team photos as requested
	// Using abstract tech/engineering placeholders for now
</script>

<svelte:head>
	<title>About Us | HOPNIC CO., LTD.</title>
	<meta name="description" content="Learn about HOPNIC CO., LTD. - Our Story, Philosophy, and Engineering Team." />
</svelte:head>

<div class="bg-white">
	<!-- Hero Header -->
	<header class="bg-neutral-900 py-24 sm:py-32 relative overflow-hidden">
		<div class="absolute inset-0 opacity-20">
             <!-- Abstract grid or pattern could go here -->
			<svg class="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
				<defs>
					<pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
						<path d="M.5 200V.5H200" fill="none" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
			</svg>
		</div>
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">About Us</h1>
			<p class="text-lg leading-8 text-neutral-300 max-w-2xl">
				{aboutData.ourVision.text}
			</p>
		</div>
	</header>

	<!-- Our Story -->
	<section class="py-24 sm:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div>
					<h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6">
						{aboutData.ourStory.title}
					</h2>
					<div class="space-y-6 text-lg text-neutral-600 leading-relaxed">
						{#each aboutData.ourStory.content as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>
				<div class="relative">
					<div class="aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden shadow-xl">
						<!-- Placeholder for Team Meeting / Working Photo -->
						<div class="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400">
							<span class="text-sm font-medium uppercase tracking-wider">Team Meeting Photo</span>
						</div>
					</div>
                    <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-lg -z-10"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Our Philosophy -->
	<section class="bg-neutral-50 py-24 sm:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
			<h2 class="text-base font-semibold leading-7 text-yellow-600 mb-2">Our Philosophy</h2>
			<h3 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-8">
				{aboutData.ourPhilosophy.subtitle}
			</h3>
			<div class="text-xl text-neutral-600 leading-relaxed">
				{#each aboutData.ourPhilosophy.content as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- What We Do -->
	<section class="py-24 sm:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
					{aboutData.whatWeDo.title}
				</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each aboutData.whatWeDo.items as item}
					<div class="group p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<h3 class="text-xl font-bold text-neutral-900 mb-4 group-hover:text-yellow-600 transition-colors">
							{item.title}
						</h3>
						<p class="text-neutral-500 leading-relaxed">
							{item.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why Trust Us -->
	<section class="bg-neutral-900 py-24 sm:py-32 relative overflow-hidden">
		<!-- Decor -->
		<div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

		<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="text-center mb-20">
				<h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
					{aboutData.whyTrustUs.title}
				</h2>
				<p class="text-neutral-400 text-lg max-w-2xl mx-auto">
					เหตุผลที่คุณควรเลือกเรา
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
				{#each aboutData.whyTrustUs.items as item, index}
					<div class="text-center group">
						<div class="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10 group-hover:scale-110 group-hover:border-white/30 transition-all duration-300 shadow-xl">
							{#if index === 0}
								<svg class="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							{:else if index === 1}
								<svg class="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M9 12L11 14L15 10" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							{:else}
								<svg class="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M2 17L12 22L22 17" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M2 12L12 17L22 12" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							{/if}
						</div>
						<h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
						<p class="text-neutral-300 leading-relaxed max-w-sm mx-auto text-base">
							{item.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Organization Chart -->
	<section class="py-24 sm:py-32 bg-neutral-50/50">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold tracking-tight text-neutral-900">Organization Chart</h2>
				<p class="mt-4 text-neutral-500">Our Professional Team Structure</p>
			</div>
			
			<OrganizationChart />
		</div>
	</section>
</div>

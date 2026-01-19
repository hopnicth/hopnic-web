<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentImageIndex = $state(0);

	function nextImage() {
		if (currentImageIndex < data.project.images.length - 1) {
			currentImageIndex++;
		}
	}

	function prevImage() {
		if (currentImageIndex > 0) {
			currentImageIndex--;
		}
	}
</script>

<svelte:head>
	<title>{data.project.title} - HOPNIC Portfolio</title>
	<meta name="description" content={data.project.subHeader} />
</svelte:head>

<div class="min-h-screen bg-neutral-50">
	<!-- Back Button -->
	<div class="bg-white border-b border-neutral-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a href="/portfolio" class="text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				กลับไปยัง Portfolio
			</a>
		</div>
	</div>

	<!-- Project Content -->
	<article class="py-12">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<header class="mb-8">
				<div class="flex flex-wrap gap-2 mb-4">
					{#each data.project.tags as tag}
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
							{tag}
						</span>
					{/each}
				</div>
				<h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
					{data.project.title}
				</h1>
				<p class="text-xl text-neutral-600">
					{data.project.subHeader}
				</p>
				<div class="mt-4 text-sm text-neutral-500">
					{new Date(data.project.createdAt).toLocaleDateString('th-TH', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
			</header>

			<!-- Image Gallery -->
			{#if data.project.images.length > 0}
				<div class="mb-12">
					<!-- Main Image -->
					<div class="relative aspect-video bg-neutral-200 rounded-2xl overflow-hidden mb-4">
						<img
							src={data.project.images[currentImageIndex].imageUrl}
							alt="{data.project.title} - Image {currentImageIndex + 1}"
							class="w-full h-full object-cover"
						/>

						<!-- Navigation Arrows -->
						{#if data.project.images.length > 1}
							<button
								onclick={prevImage}
								disabled={currentImageIndex === 0}
								class="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								onclick={nextImage}
								disabled={currentImageIndex === data.project.images.length - 1}
								class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</button>

							<!-- Image Counter -->
							<div class="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
								{currentImageIndex + 1} / {data.project.images.length}
							</div>
						{/if}
					</div>

					<!-- Thumbnails -->
					{#if data.project.images.length > 1}
						<div class="grid grid-cols-4 md:grid-cols-6 gap-2">
							{#each data.project.images as image, index}
								<button
									onclick={() => (currentImageIndex = index)}
									class="aspect-video rounded-lg overflow-hidden border-2 transition-all {currentImageIndex === index
										? 'border-blue-600'
										: 'border-transparent hover:border-neutral-300'}"
								>
									<img src={image.imageUrl} alt="Thumbnail {index + 1}" class="w-full h-full object-cover" />
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Content -->
			<div class="prose prose-neutral max-w-none">
				<div class="bg-white rounded-2xl shadow-sm p-8 border border-neutral-200">
					<h2 class="text-2xl font-bold text-neutral-900 mb-4">รายละเอียดโปรเจค</h2>
					<div class="text-neutral-700 whitespace-pre-wrap leading-relaxed">
						{data.project.bodyContent}
					</div>
				</div>
			</div>

			<!-- CTA -->
			<div class="mt-12 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 text-center">
				<h3 class="text-2xl font-bold mb-2">สนใจโปรเจคนี้?</h3>
				<p class="text-neutral-300 mb-6">ติดต่อเราเพื่อปรึกษาและขอใบเสนอราคา</p>
				<a
					href="/contact"
					class="inline-block px-8 py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
				>
					ติดต่อเรา
				</a>
			</div>
		</div>
	</article>
</div>


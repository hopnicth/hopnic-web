<script lang="ts">
	import type { PageData } from './$types';
	import type { ProjectWithImages } from '$lib/server/portfolio.service';

	let { data }: { data: PageData } = $props();

	let selectedFilter = $state<string>('All');

	// Filtered projects based on selected tag
	let filteredProjects = $derived<ProjectWithImages[]>(
		selectedFilter === 'All'
			? data.projects
			: data.projects.filter((project) => project.tags.includes(selectedFilter))
	);

	function getCoverImage(project: ProjectWithImages): string {
		const coverImage = project.images.find((img) => img.isCover);
		if (coverImage) return coverImage.imageUrl;
		if (project.images.length > 0) return project.images[0].imageUrl;
		return '/placeholder-project.jpg';
	}
</script>

<svelte:head>
	<title>Portfolio - HOPNIC CO., LTD.</title>
	<meta name="description" content="ผลงานและโปรเจคของ HOPNIC - ผู้เชี่ยวชาญด้านระบบอัตโนมัติและวิศวกรรม" />
</svelte:head>

<div class="min-h-screen bg-neutral-50">
	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
				<p class="text-xl text-neutral-300 max-w-2xl mx-auto">
					ผลงานและโปรเจคที่เราภูมิใจ - ประสบการณ์กว่า 4 ปีในการให้บริการ
				</p>
			</div>
		</div>
	</section>

	<!-- Filter Section -->
	<section class="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<button
					onclick={() => (selectedFilter = 'All')}
					class="px-6 py-2 rounded-full font-medium transition-all {selectedFilter === 'All'
						? 'bg-neutral-900 text-white'
						: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
				>
					All Projects ({data.projects.length})
				</button>

				{#each data.validTags as tag}
					{@const count = data.projects.filter((p) => p.tags.includes(tag)).length}
					<button
						onclick={() => (selectedFilter = tag)}
						class="px-6 py-2 rounded-full font-medium transition-all {selectedFilter === tag
							? 'bg-neutral-900 text-white'
							: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
					>
						{tag} ({count})
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Projects Grid -->
	<section class="py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{#if filteredProjects.length === 0}
				<div class="text-center py-20">
					<div class="text-6xl mb-4">📁</div>
					<h3 class="text-2xl font-bold text-neutral-900 mb-2">ยังไม่มีโปรเจคในหมวดนี้</h3>
					<p class="text-neutral-600">กรุณาเลือกหมวดอื่น หรือกลับมาดูใหม่ภายหลัง</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each filteredProjects as project}
						<a
							href="/portfolio/{project.id}"
							class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200"
						>
							<!-- Image -->
							<div class="relative aspect-video overflow-hidden bg-neutral-200">
								<img
									src={getCoverImage(project)}
									alt={project.title}
									class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<!-- Tags Overlay -->
								<div class="absolute top-4 left-4 flex flex-wrap gap-2">
									{#each project.tags as tag}
										<span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium rounded-full">
											{tag}
										</span>
									{/each}
								</div>
							</div>

							<!-- Content -->
							<div class="p-6">
								<h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
									{project.title}
								</h3>
								<p class="text-neutral-600 line-clamp-2">
									{project.subHeader}
								</p>

								<!-- Meta -->
								<div class="mt-4 flex items-center justify-between text-sm text-neutral-500">
									<span>{new Date(project.createdAt).toLocaleDateString('th-TH')}</span>
									<span class="text-blue-600 group-hover:translate-x-1 transition-transform">
										ดูรายละเอียด →
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-neutral-900 text-white py-16">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold mb-4">สนใจให้เราช่วยคุณไหม?</h2>
			<p class="text-xl text-neutral-300 mb-8">
				ปรึกษาฟรี! เราพร้อมให้คำแนะนำและออกแบบโซลูชันที่เหมาะกับธุรกิจของคุณ
			</p>
			<a
				href="/contact"
				class="inline-block px-8 py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
			>
				ติดต่อเรา
			</a>
		</div>
	</section>
</div>


<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let deletingId = $state<number | null>(null);

	function confirmDelete(id: number, title: string) {
		if (confirm(`คุณต้องการลบโปรเจค "${title}" ใช่หรือไม่?`)) {
			deletingId = id;
			return true;
		}
		return false;
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-neutral-900">โปรเจคทั้งหมด</h1>
			<p class="mt-1 text-sm text-neutral-600">จัดการและดูโปรเจค</p>
		</div>
		<div class="text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
			🧪 Mock Mode
		</div>
	</div>

	<!-- Projects List -->
	{#if data.projects.length === 0}
		<div class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
			<div class="text-5xl mb-3">📁</div>
			<h3 class="text-lg font-semibold text-neutral-900 mb-1">ยังไม่มีโปรเจค</h3>
			<p class="text-sm text-neutral-500">ต้องการ Database เพื่อสร้างโปรเจค</p>
		</div>
	{:else}
		<div class="bg-white rounded-lg border border-neutral-200 overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-neutral-50 border-b border-neutral-200">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-medium text-neutral-600">
								รูปภาพ
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-neutral-600">
								ชื่อโปรเจค
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-neutral-600">
								Tags
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-neutral-600">
								วันที่
							</th>
							<th class="px-4 py-3 text-right text-xs font-medium text-neutral-600">
								จัดการ
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-neutral-200">
						{#each data.projects as project}
							<tr class="hover:bg-neutral-50 transition-colors">
								<!-- Image -->
								<td class="px-4 py-3">
									{#if project.images.length > 0}
										<img
											src={project.images.find((img) => img.isCover)?.imageUrl ||
												project.images[0].imageUrl}
											alt={project.title}
											class="w-14 h-14 object-cover rounded-lg"
										/>
									{:else}
										<div class="w-14 h-14 bg-neutral-100 rounded-lg flex items-center justify-center">
											<span class="text-xl">📷</span>
										</div>
									{/if}
								</td>

								<!-- Title -->
								<td class="px-4 py-3">
									<div class="font-medium text-neutral-900 text-sm">{project.title}</div>
									<div class="text-xs text-neutral-500 mt-0.5 line-clamp-1">{project.subHeader}</div>
								</td>

								<!-- Tags -->
								<td class="px-4 py-3">
									<div class="flex flex-wrap gap-1">
										{#each project.tags.slice(0, 2) as tag}
											<span class="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded">
												{tag}
											</span>
										{/each}
										{#if project.tags.length > 2}
											<span class="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-500 rounded">
												+{project.tags.length - 2}
											</span>
										{/if}
									</div>
								</td>

								<!-- Created At -->
								<td class="px-4 py-3 text-sm text-neutral-500">
									{new Date(project.createdAt).toLocaleDateString('th-TH', {
										day: 'numeric',
										month: 'short',
										year: 'numeric'
									})}
								</td>

								<!-- Actions -->
								<td class="px-4 py-3 text-right">
									<div class="flex items-center justify-end gap-3">
										<a
											href={`/portfolio/${project.id}`}
											target="_blank"
											class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
										>
											ดู
										</a>
										<span class="text-neutral-300">|</span>
										<button
											disabled
											class="text-sm text-neutral-400 cursor-not-allowed"
											title="ต้องการ Database"
										>
											แก้ไข
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>


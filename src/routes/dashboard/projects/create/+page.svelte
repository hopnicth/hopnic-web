<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let selectedFiles = $state<File[]>([]);
	let previewUrls = $state<string[]>([]);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			selectedFiles = Array.from(input.files);
			// Create preview URLs
			previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
		}
	}

	function removeFile(index: number) {
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
		URL.revokeObjectURL(previewUrls[index]);
		previewUrls = previewUrls.filter((_, i) => i !== index);
	}
</script>

<div class="max-w-4xl">
	<!-- Header -->
	<div class="mb-6">
		<a href="/dashboard/projects" class="text-neutral-600 hover:text-neutral-900 text-sm mb-2 inline-block">
			← กลับ
		</a>
		<h1 class="text-3xl font-bold text-neutral-900">สร้างโปรเจคใหม่</h1>
		<p class="mt-2 text-neutral-600">เพิ่มโปรเจคใหม่ลงในพอร์ตโฟลิโอ</p>
	</div>

	<!-- Error Message -->
	{#if form?.error}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
			<p class="text-red-800 text-sm">{form.error}</p>
		</div>
	{/if}

	<!-- Form -->
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
		class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6"
	>
		<!-- Title -->
		<div>
			<label for="title" class="block text-sm font-medium text-neutral-700 mb-2">
				ชื่อโปรเจค <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="title"
				name="title"
				required
				value={form?.title || ''}
				disabled={loading}
				class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
				placeholder="เช่น: ระบบ Automation สำหรับโรงงาน"
			/>
		</div>

		<!-- Sub Header -->
		<div>
			<label for="subHeader" class="block text-sm font-medium text-neutral-700 mb-2">
				หัวข้อย่อย <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="subHeader"
				name="subHeader"
				required
				value={form?.subHeader || ''}
				disabled={loading}
				class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
				placeholder="เช่น: ออกแบบและติดตั้งระบบควบคุมอัตโนมัติ"
			/>
		</div>

		<!-- Body Content -->
		<div>
			<label for="bodyContent" class="block text-sm font-medium text-neutral-700 mb-2">
				รายละเอียด <span class="text-red-500">*</span>
			</label>
			<textarea
				id="bodyContent"
				name="bodyContent"
				required
				value={form?.bodyContent || ''}
				disabled={loading}
				rows="8"
				class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
				placeholder="รายละเอียดของโปรเจค (รองรับ Markdown)"
			></textarea>
			<p class="mt-1 text-sm text-neutral-500">รองรับ Markdown formatting</p>
		</div>

		<!-- Tags -->
		<div>
			<label class="block text-sm font-medium text-neutral-700 mb-3">
				Tags <span class="text-red-500">*</span>
			</label>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each data.validTags as tag}
					<label class="flex items-center gap-2 p-3 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
						<input
							type="checkbox"
							name="tags"
							value={tag}
							checked={form?.tags?.includes(tag)}
							disabled={loading}
							class="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
						/>
						<span class="text-sm font-medium text-neutral-700">{tag}</span>
					</label>
				{/each}
			</div>
		</div>

		<!-- Images Upload -->
		<div>
			<label class="block text-sm font-medium text-neutral-700 mb-2">
				รูปภาพ
			</label>
			<input
				type="file"
				name="images"
				multiple
				accept="image/jpeg,image/jpg,image/png,image/webp"
				disabled={loading}
				onchange={handleFileSelect}
				class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
			/>
			<p class="mt-1 text-sm text-neutral-500">
				รองรับ JPEG, PNG, WebP (สูงสุด 5MB ต่อไฟล์) - รูปแรกจะเป็นรูปหน้าปก
			</p>

			<!-- Image Previews -->
			{#if previewUrls.length > 0}
				<div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
					{#each previewUrls as url, index}
						<div class="relative group">
							<img src={url} alt="Preview {index + 1}" class="w-full h-32 object-cover rounded-lg" />
							{#if index === 0}
								<span class="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
									หน้าปก
								</span>
							{/if}
							<button
								type="button"
								onclick={() => removeFile(index)}
								class="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex items-center gap-4 pt-4 border-t border-neutral-200">
			<button
				type="submit"
				disabled={loading}
				class="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
			>
				{loading ? 'กำลังสร้าง...' : 'สร้างโปรเจค'}
			</button>
			<a
				href="/dashboard/projects"
				class="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
			>
				ยกเลิก
			</a>
		</div>
	</form>
</div>


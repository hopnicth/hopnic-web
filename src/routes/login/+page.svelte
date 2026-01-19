<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>เข้าสู่ระบบ - HOPNIC Admin</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
	<div class="w-full max-w-md">
		<!-- Logo/Brand -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-neutral-900 mb-1">HOPNIC</h1>
			<p class="text-neutral-500 text-sm">Admin Panel</p>
		</div>

		<!-- Login Card -->
		<div class="bg-white rounded-lg border border-neutral-200 p-8">
			<h2 class="text-xl font-semibold text-neutral-900 mb-6">เข้าสู่ระบบ</h2>

			<!-- Error Message -->
			{#if form?.error}
				<div class="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p class="text-red-700 text-sm">❌ {form.error}</p>
				</div>
			{/if}

			<!-- Login Form -->
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<div class="mb-6">
					<label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
						รหัสผ่าน
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						disabled={loading}
						class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all disabled:opacity-50"
						placeholder="กรอกรหัสผ่าน"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
				>
					{#if loading}
						<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
						กำลังเข้าสู่ระบบ...
					{:else}
						เข้าสู่ระบบ
					{/if}
				</button>
			</form>

			<!-- Info -->
			<div class="mt-6 pt-6 border-t border-neutral-200">
				<p class="text-sm text-neutral-500 text-center">
					สำหรับผู้ดูแลระบบเท่านั้น
				</p>
			</div>
		</div>

		<!-- Back to Home -->
		<div class="text-center mt-6">
			<a href="/" class="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
				← กลับสู่หน้าหลัก
			</a>
		</div>
	</div>
</div>


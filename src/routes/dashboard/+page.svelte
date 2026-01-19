<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-neutral-900">Dashboard</h1>
			<p class="mt-1 text-neutral-600">ยินดีต้อนรับสู่ระบบจัดการเว็บไซต์ HOPNIC</p>
		</div>
		<!-- Mock Mode Badge -->
		<div class="bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
			<p class="text-sm font-medium text-amber-800">🧪 Mock Mode</p>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Total Projects -->
		<div class="bg-white rounded-lg border border-neutral-200 p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-neutral-600">โปรเจคทั้งหมด</p>
					<p class="mt-2 text-4xl font-bold text-neutral-900">{data.stats?.totalProjects || 0}</p>
				</div>
				<div class="text-5xl opacity-20">📁</div>
			</div>
		</div>

		<!-- This Month -->
		<div class="bg-white rounded-lg border border-neutral-200 p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-neutral-600">เดือนนี้</p>
					<p class="mt-2 text-4xl font-bold text-neutral-900">{data.stats?.thisMonth || 0}</p>
				</div>
				<div class="text-5xl opacity-20">📊</div>
			</div>
		</div>

		<!-- Total Images -->
		<div class="bg-white rounded-lg border border-neutral-200 p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-neutral-600">รูปภาพทั้งหมด</p>
					<p class="mt-2 text-4xl font-bold text-neutral-900">{data.stats?.totalImages || 0}</p>
				</div>
				<div class="text-5xl opacity-20">🖼️</div>
			</div>
		</div>
	</div>

	<!-- Quick Links -->
	<div class="bg-white rounded-lg border border-neutral-200 p-6">
		<h2 class="text-lg font-semibold text-neutral-900 mb-4">เมนูหลัก</h2>
		<div class="space-y-2">
			<a
				href="/dashboard/projects"
				class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors group"
			>
				<div class="text-2xl">📁</div>
				<div class="flex-1">
					<p class="font-medium text-neutral-900">จัดการโปรเจค</p>
					<p class="text-sm text-neutral-500">ดู แก้ไข และลบโปรเจค</p>
				</div>
				<div class="text-neutral-400 group-hover:text-neutral-600 transition-colors">→</div>
			</a>

			<a
				href="/portfolio"
				target="_blank"
				class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors group"
			>
				<div class="text-2xl">🌐</div>
				<div class="flex-1">
					<p class="font-medium text-neutral-900">ดูหน้าเว็บไซต์</p>
					<p class="text-sm text-neutral-500">เปิดหน้า Portfolio สาธารณะ</p>
				</div>
				<div class="text-neutral-400 group-hover:text-neutral-600 transition-colors">↗</div>
			</a>
		</div>
	</div>

	<!-- Info Box -->
	<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
		<div class="flex gap-3">
			<div class="text-2xl">ℹ️</div>
			<div>
				<h3 class="font-semibold text-blue-900 mb-1">Mock Mode</h3>
				<p class="text-sm text-blue-800 leading-relaxed">
					ขณะนี้ระบบทำงานในโหมดทดสอบ (Mock Mode) โดยใช้ข้อมูลตัวอย่าง
					<br />
					หากต้องการใช้งานจริง กรุณาเชื่อมต่อกับ Database
				</p>
			</div>
		</div>
	</div>
</div>


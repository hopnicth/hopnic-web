<script lang="ts">
	// Organization Chart Component
	// Represents the hierarchy: CEO -> Project Manager -> Site Eng / Design Eng -> Foreman
	import { onMount } from 'svelte';

	let userCrownIcon = $state('');
	let briefcaseIcon = $state('');
	let hardHatIcon = $state('');
	let designPencilIcon = $state('');

	onMount(async () => {
		const [userCrown, suitcase, hardHat, designPencil] = await Promise.all([
			import('iconoir/icons/regular/crown.svg?raw'),
			import('iconoir/icons/regular/suitcase.svg?raw'),
			import('iconoir/icons/regular/hat.svg?raw'),
			import('iconoir/icons/regular/design-pencil.svg?raw')
		]);
		userCrownIcon = userCrown.default;
		briefcaseIcon = suitcase.default;
		hardHatIcon = hardHat.default;
		designPencilIcon = designPencil.default;
	});
</script>

<div class="w-full overflow-x-auto py-12">
	<div class="min-w-[800px] flex flex-col items-center gap-16">

		<!-- Level 1: CEO -->
		<div class="flex flex-col items-center relative">
			<div class="w-56 p-6 bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-xl border-2 border-neutral-200 text-center relative z-10 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300">
				<div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 shadow-inner">
					{#if userCrownIcon}
						<span class="w-12 h-12 inline-block">
							{@html userCrownIcon}
						</span>
					{/if}
				</div>
				<h3 class="font-bold text-neutral-900 text-lg">CEO</h3>
				<p class="text-xs text-neutral-500 mt-2 font-medium">Strategic Direction</p>
			</div>
			<!-- Connector Down -->
			<div class="w-0.5 h-16 bg-gradient-to-b from-neutral-300 to-neutral-200 absolute -bottom-16 left-1/2 -translate-x-1/2"></div>
		</div>

		<!-- Level 2: Project Manager -->
		<div class="flex flex-col items-center relative">
			<div class="w-0.5 h-16 bg-gradient-to-b from-neutral-200 to-neutral-300 absolute -top-16 left-1/2 -translate-x-1/2"></div>
			<div class="w-56 p-6 bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-xl border-2 border-neutral-200 text-center relative z-10 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300">
				<div class="w-24 h-24 mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-full mb-4 flex items-center justify-center text-green-600 shadow-inner">
					{#if briefcaseIcon}
						<span class="w-12 h-12 inline-block">
							{@html briefcaseIcon}
						</span>
					{/if}
				</div>
				<h3 class="font-bold text-neutral-900 text-lg">Project Manager</h3>
				<p class="text-xs text-neutral-500 mt-2 font-medium">Project Execution</p>
			</div>
			<!-- Connector Down (Branching) -->
			<div class="w-0.5 h-16 bg-gradient-to-b from-neutral-300 to-neutral-200 absolute -bottom-16 left-1/2 -translate-x-1/2"></div>
		</div>

		<!-- Level 3: Engineers (Branching) -->
		<div class="relative w-full flex justify-center gap-24">
			<!-- Horizontal Line connecting branches -->
			<div class="absolute -top-16 left-1/2 -translate-x-1/2 w-[calc(50%+6rem)] h-16 border-t-2 border-l-2 border-r-2 border-neutral-300 rounded-t-2xl pointer-events-none"></div>

			<!-- Branch Left: Site Engineer -->
			<div class="flex flex-col items-center relative">
               <!-- Connector from horizontal line -->
               <div class="w-0.5 h-8 bg-gradient-to-b from-neutral-200 to-neutral-300 absolute -top-8 left-1/2 -translate-x-1/2"></div>
				<div class="w-52 p-5 bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-lg border-2 border-neutral-200 text-center relative z-10 transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
					<div class="w-20 h-20 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full mb-4 flex items-center justify-center text-amber-600 shadow-inner">
						{#if hardHatIcon}
							<span class="w-10 h-10 inline-block">
								{@html hardHatIcon}
							</span>
						{/if}
					</div>
					<h3 class="font-bold text-neutral-900">Site Engineer</h3>
					<p class="text-xs text-neutral-500 mt-2 font-medium">On-site Control</p>
				</div>
                <!-- Connector Down to Foreman -->
                <div class="w-0.5 h-10 bg-gradient-to-b from-neutral-300 to-neutral-200 absolute -bottom-10 left-1/2 -translate-x-1/2"></div>

                <!-- Level 4: Foreman (Under Site Eng) -->
                <div class="mt-10">
                     <div class="w-44 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-300 text-center relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 class="font-bold text-neutral-800 text-sm">Foreman</h3>
                        <p class="text-[11px] text-neutral-500 mt-1 font-medium">Operation Supervision</p>
                    </div>
                </div>
			</div>

			<!-- Branch Right: Design Engineer -->
			<div class="flex flex-col items-center relative">
                 <!-- Connector from horizontal line -->
                 <div class="w-0.5 h-8 bg-gradient-to-b from-neutral-200 to-neutral-300 absolute -top-8 left-1/2 -translate-x-1/2"></div>
				<div class="w-52 p-5 bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-lg border-2 border-neutral-200 text-center relative z-10 transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
					<div class="w-20 h-20 mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-full mb-4 flex items-center justify-center text-purple-600 shadow-inner">
						{#if designPencilIcon}
							<span class="w-10 h-10 inline-block">
								{@html designPencilIcon}
							</span>
						{/if}
					</div>
					<h3 class="font-bold text-neutral-900">Design Engineer</h3>
					<p class="text-xs text-neutral-500 mt-2 font-medium">System Design</p>
				</div>
			</div>
		</div>

	</div>
</div>

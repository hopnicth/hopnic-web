<script lang="ts">
	import { offices } from '$lib/data/offices';
	import ContactCard from '$lib/components/business/ContactCard.svelte';
	import { onMount } from 'svelte';

	let mailIcon = $state('');
	let clockIcon = $state('');

	onMount(async () => {
		const [mail, clock] = await Promise.all([
			import('iconoir/icons/regular/mail.svg?raw'),
			import('iconoir/icons/regular/clock.svg?raw')
		]);
		mailIcon = mail.default;
		clockIcon = clock.default;
	});
</script>

<svelte:head>
	<title>Contact Us | HOPNIC CO., LTD.</title>
	<meta name="description" content="Contact HOPNIC CO., LTD. - Find our office locations and contact information." />
</svelte:head>

<div class="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
	<!-- Header -->
	<header class="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20 sm:py-28 relative overflow-hidden">
		<!-- Decorative elements -->
		<div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

		<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
				<span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
				<span class="text-sm font-semibold text-white">พร้อมให้บริการ</span>
			</div>
			<h1 class="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">Contact Us</h1>
			<p class="text-neutral-300 text-xl max-w-3xl mx-auto leading-relaxed">
				We are ready to design and build your factory with our professional engineering team.
			</p>
		</div>
	</header>

	<!-- Content -->
	<main class="py-20 sm:py-28 -mt-16">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Offices Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-24">
				{#each offices as office}
					<div class="h-full">
						<ContactCard {office} />
					</div>
				{/each}
			</div>

			<!-- Additional Info -->
			<div class="max-w-4xl mx-auto">
				<div class="bg-gradient-to-br from-white to-neutral-50 rounded-3xl shadow-xl border border-neutral-200 p-12">
					<div class="text-center mb-12">
						<h2 class="text-3xl font-bold text-neutral-900 mb-4">Need Immediate Assistance?</h2>
						<p class="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
							Our team is available Monday - Saturday, 08:30 - 17:30.
							For urgent inquiries, please call our headquarters directly.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
						<!-- Working Hours -->
						<div class="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
							{#if clockIcon}
								<div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
									<span class="w-6 h-6 text-blue-600 inline-block">
										{@html clockIcon}
									</span>
								</div>
							{/if}
							<div>
								<h3 class="font-bold text-neutral-900 mb-2">Working Hours</h3>
								<p class="text-neutral-600 text-sm">Monday - Saturday</p>
								<p class="text-neutral-900 font-semibold">08:30 - 17:30</p>
							</div>
						</div>

						<!-- Email -->
						<div class="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
							{#if mailIcon}
								<div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
									<span class="w-6 h-6 text-amber-600 inline-block">
										{@html mailIcon}
									</span>
								</div>
							{/if}
							<div>
								<h3 class="font-bold text-neutral-900 mb-2">Email</h3>
								<a href="mailto:info@hopnic.com" class="text-blue-600 hover:text-blue-700 font-semibold">
									info@hopnic.com
								</a>
							</div>
						</div>
					</div>

					<div class="text-center">
						<a
							href="mailto:info@hopnic.com"
							class="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-neutral-800 hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							{#if mailIcon}
								<span class="w-5 h-5 inline-block">
									{@html mailIcon}
								</span>
							{/if}
							Email Us
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

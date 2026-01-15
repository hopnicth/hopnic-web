<script lang="ts">
	// Hero Component for the Corporate Site
	import { onMount } from 'svelte';

	let scrollY = $state(0);

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section class="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
	<!-- Background Image with Parallax -->
	<div class="absolute inset-0 w-full h-full" style="transform: translateY({scrollY * 0.5}px)">
		<img
			src="/Images/hero-banner.png"
			alt="Background"
			class="w-full h-full object-cover scale-110"
		/>
		<!-- Enhanced overlay for better text readability -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/70"
		></div>
		<div class="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
	</div>

	<!-- Animated gradient overlay -->
	<div class="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-amber-500/10 animate-pulse"></div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="max-w-6xl mx-auto">
			<!-- Badge -->
			<div class="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
				<span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
				<span class="text-sm font-semibold text-white">Engineering Excellence Since 2020</span>
			</div>

			<h1
				class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mb-6 animate-fade-in"
			>
				Your Vision.
			</h1>
			<h1
				class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-amber-400 drop-shadow-lg mb-8"
			>
				Our Engineer
			</h1>
			<p class="mt-8 text-xl sm:text-3xl text-white font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
				Building the digital future, together.
			</p>

			<!-- CTA Buttons -->
			<div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
				<a
					href="/about"
					class="px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
				>
					เรียนรู้เพิ่มเติม
				</a>
				<a
					href="/contact"
					class="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
				>
					ติดต่อเรา
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
		</svg>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 1s ease-out;
	}
</style>

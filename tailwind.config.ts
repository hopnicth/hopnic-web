import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Bai Jamjuree"', 'sans-serif']
			},
			colors: {
				primary: '#0F172A',
				secondary: '#334155',
				success: '#10B981',
				warning: '#F59E0B',
				error: '#EF4444'
			}
		}
	},
	plugins: [forms, typography]
} satisfies Config;

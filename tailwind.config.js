/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
			colors: {
				background: "#615add",
				textPrimary: "#87ebcd",
				textSecondary: "#dad8f7",
				input: "#6d67d0",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};

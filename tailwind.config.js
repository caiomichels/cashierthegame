/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"
import { transform } from "typescript"

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"sepia-200": "#f9d79a",
				"sepia-500": "#f0bb56",
			},
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
				ibm: ["IBM Plex Mono", "monospace"],
			},
			spacing: {
				13: "3.25rem",

				"1/2vw": "50vw",
				"1/3vw": "33.333333vw",
				"2/3vw": "66.666667vw",
				"1/4vw": "25vw",
				"2/4vw": "50vw",
				"3/4vw": "75vw",
				"1/5vw": "20vw",
				"2/5vw": "40vw",
				"3/5vw": "60vw",
				"4/5vw": "80vw",
				"1/6vw": "16.666667vw",
				"2/6vw": "33.333333vw",
				"3/6vw": "50vw",
				"4/6vw": "66.666667vw",
				"5/6vw": "83.333333vw",
				"1/12vw": "8.333333vw",
				"2/12vw": "16.666667vw",
				"3/12vw": "25vw",
				"4/12vw": "33.333333vw",
				"5/12vw": "41.666667vw",
				"6/12vw": "50vw",
				"7/12vw": "58.333333vw",
				"8/12vw": "66.666667vw",
				"9/12vw": "75vw",
				"10/12vw": "83.333333vw",
				"11/12vw": "91.666667vw",

				"1/2vh": "50vh",
				"1/3vh": "33.333333vh",
				"2/3vh": "66.666667vh",
				"1/4vh": "25vh",
				"2/4vh": "50vh",
				"3/4vh": "75vh",
				"1/5vh": "20vh",
				"2/5vh": "40vh",
				"3/5vh": "60vh",
				"4/5vh": "80vh",
				"1/6vh": "16.666667vh",
				"2/6vh": "33.333333vh",
				"3/6vh": "50vh",
				"4/6vh": "66.666667vh",
				"5/6vh": "83.333333vh",
				"1/12vh": "8.333333vh",
				"2/12vh": "16.666667vh",
				"3/12vh": "25vh",
				"4/12vh": "33.333333vh",
				"5/12vh": "41.666667vh",
				"6/12vh": "50vh",
				"7/12vh": "58.333333vh",
				"8/12vh": "66.666667vh",
				"9/12vh": "75vh",
				"10/12vh": "83.333333vh",
				"11/12vh": "91.666667vh",
			},
			WebkitTextStroke: {
				1: "1px var(--tw-shadow-color)",
				2: "2px var(--tw-shadow-color)",
				3: "3px var(--tw-shadow-color)",
				4: "4px var(--tw-shadow-color)",
			},
			keyframes: {
				shake: {
					"0%, 50%, 100%": { transform: "translateX(-3%)" },
					"25%, 75%": { transform: "translateX(3%)" },
				},
				float: {
					"0%, 100%": { transform: "translate(-1%, -1%)" },
					"50%": { transform: "translate(1%, 1%)" },
				},
				rotate: {
					"0%": { transform: "rotate(0)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				shake: "shake 500ms linear",
				float: "float 4s ease-in-out infinite",
				rotate: "rotate 4s linear infinite",
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-stroke": (value) => ({
						WebkitTextStroke: value,
					}),
				},
				{ values: theme("WebkitTextStroke") }
			)
		}),
	],
}

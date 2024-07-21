module.exports = {
	content: ["./src/**/*.{html,mustache,js}"],
	theme: {
		extend: {
			colors: {
				primarybg: "#F4F5F7",
				primarytext: "#172B4D",
				secondarytext: "#42526E",
				todo: "#FFAB00",
				wip: "#0052CC",
				review: "#36B37E",
				done: "#00875A",
				taskbg: "#FFFFFF",
				p1: "#FF5630",
				p2: "#FF8B00",
				p3: "#36B37E",
				bug: "#FF5630",
				improvement: "#FF8B00",
				feature: "#36B37E",
				completed: "#E3FCEF",
				accent: "#0052CC",
				accentnt: "#FF5630",
				hover: "#2684FF",
				border: "#DFE1E6",
				lightbg: "#FAFBFC",
				darkbg: "#091E42",
			},
		},
	},
	variants: {},
	plugins: [],
	safelist: [
		"bg-feature",
		"bg-bug",
		"bg-improvement",
		"bg-todo",
		"bg-wip",
		"bg-review",
		"bg-done",
		"border-todo",
		"border-wip",
		"border-review",
		"border-done",
	],
};

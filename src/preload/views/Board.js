const { ipcRenderer } = require("electron");
const BoardAPI = require("../api/BoardAPI");

/** @type {View<{id: string}>} */
const Board = {
	async get(id) {
		const boards = await BoardAPI.get(id);
		if (!boards.length) return "404";
		const status = ["todo", "wip", "review", "done"];
		return await ipcRenderer.invoke("render-template", {
			template: "Board",
			data: {
				page: boards[0].name,
				breadcrumbs: [
					{
						click: "showDashboard",
						target: "null",
						label: "Dashboard",
					},
				],
				columns: status.map((it) => ({
					label: it,
					issues: boards[0].issues.filter(
						(issue) => issue.status === it
					),
				})),
			},
		});
	},
};

module.exports = Board;

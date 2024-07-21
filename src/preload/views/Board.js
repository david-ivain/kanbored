const { ipcRenderer } = require("electron");
const BoardAPI = require("../api/BoardAPI");

/** @type {View<{id: string}>} */
const Board = {
	async get(id) {
		const boards = await BoardAPI.get(id);
		if (!boards.length) return "404";
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
				issues: boards[0].issues,
			},
		});
	},
};

module.exports = Board;

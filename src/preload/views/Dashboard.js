const { ipcRenderer } = require("electron");
const BoardAPI = require("../api/BoardAPI");

/** @type {View<{}>} */
const Dashboard = {
	async get() {
		const boards = await BoardAPI.get();
		return await ipcRenderer.invoke("render-template", {
			template: "Dashboard",
			data: { boards },
		});
	},
};

module.exports = Dashboard;

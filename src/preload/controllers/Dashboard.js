import { ipcRenderer } from "electron";
import BoardAPI from "../api/BoardAPI";

/** @type {View<undefined>} */
const Dashboard = {
	async get() {
		const boards = await BoardAPI.get();
		return await ipcRenderer.invoke("render-template", {
			template: "Dashboard",
			data: { page: "Dashboard", breadcrumbs: [], boards },
		});
	},
};

export default Dashboard;

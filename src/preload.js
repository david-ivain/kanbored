import { contextBridge } from "electron";
import Dashboard from "./preload/controllers/Dashboard";
import Board from "./preload/controllers/Board";

/**
 * Exposes the views as an API. Might rename this variable as controllers.
 */
contextBridge.exposeInMainWorld("views", {
	dashboard: Dashboard,
	board: Board,
});

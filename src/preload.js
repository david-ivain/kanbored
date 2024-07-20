const { contextBridge } = require("electron");
const BoardAPI = require("./preload/api/BoardAPI");
const Dashboard = require("./preload/views/Dashboard");
const Board = require("./preload/views/Board");

contextBridge.exposeInMainWorld("api", {
	boards: BoardAPI,
});

contextBridge.exposeInMainWorld("views", {
	dashboard: Dashboard,
	board: Board,
});

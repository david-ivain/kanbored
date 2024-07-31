import { contextBridge, ipcRenderer } from "electron";
import { ElResponse, ElRouter } from "./preload/ElectronRouting";
import DatabaseAPI from "./preload/api/DatabaseAPI";
import { marked } from "marked";

/** @type {ElRouter<string>} */
const router = new ElRouter();
const api = router.API;

router.get("/dashboard", async () => {
	/** @type {Board[]} */
	const boards = (await DatabaseAPI.get("/board")).content();
	const response = await ipcRenderer.invoke("render-template", {
		template: "Dashboard",
		data: {
			page: "Dashboard",
			breadcrumbs: [],
			boards: boards.map((board) => {
				const parsed = marked.parse(board.description);
				if (typeof parsed === "string") board.description = parsed;
				return board;
			}),
		},
	});
	return ElResponse.OK(response);
});

router.get("/modals/boardform", async () => {
	const response = await ipcRenderer.invoke("render-template", {
		template: "BoardForm",
		data: {
			id: "",
			name: "",
			description: "",
			method: "post",
			idreadonly: "",
		},
	});
	return ElResponse.OK(response);
});

router.get("/modals/boardform/{}", async (params) => {
	/** @type {Board[]} */
	const boards = (
		await DatabaseAPI.get(`/board/${params?.param0}`)
	).content();
	if (!boards.length) return await api.get("/modals/boardform");
	const response = await ipcRenderer.invoke("render-template", {
		template: "BoardForm",
		data: {
			id: boards[0].id,
			name: boards[0].name,
			description: boards[0].description,
			method: "put",
			idreadonly: "readonly",
		},
	});
	return ElResponse.OK(response);
});

router.post("/modals/boardform", async (params) => {
	const result = await DatabaseAPI.post(`/board/${params?.id}`, params);
	return new ElResponse(result.status(), JSON.stringify(result.content()));
});

router.put("/modals/boardform/{}", async (params) => {
	const result = await DatabaseAPI.put(`/board/${params?.param0}`, params);
	return new ElResponse(result.status(), JSON.stringify(result.content()));
});

router.get("/board/{}", async (params) => {
	/** @type {Board[]} */
	const boards = (
		await DatabaseAPI.get(`/board/${params?.param0}`)
	).content();
	if (!boards.length)
		return ElResponse.NotFound("<h1>404: BOARD NOT FOUND</h1>");
	const status = ["todo", "wip", "review", "done"];
	const response = await ipcRenderer.invoke("render-template", {
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
				issues: boards[0].issues
					.filter((issue) => issue.status === it)
					.map((issue) => {
						const parsed = marked.parse(issue.description);
						if (typeof parsed === "string")
							issue.description = parsed;
						return issue;
					}),
			})),
		},
	});
	return ElResponse.OK(response);
});

/**
 * Exposes the views as an API
 */
contextBridge.exposeInMainWorld("api", api);

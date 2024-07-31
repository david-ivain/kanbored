/**
 * @module BoardAPI
 */

import { ElResponse, ElRouter } from "../ElectronRouting";
import { deepCopy } from "../utils/Utils";

/** @type {Board[]} */
const sampleBoards = [
	{
		id: "kanbored",
		name: "Kanbored",
		description:
			"Kanban board and more.\n\nProbably priority management in the future as well.",
		issues: [
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "todo",
				type: "improvement",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "review",
				type: "bug",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "done",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard\n\nTasks (make actual subtasks later):\n\n- view boards\n\n- go to board\n\n- manage boards`,
				status: "review",
				type: "feature",
			},
		],
	},
	{
		id: "platformer",
		name: "Platformer assignment",
		description:
			"Platformer game project.\n\nStill not started or planned.",
		issues: [
			{
				id: "makeengine",
				name: "Make Engine",
				description: `Make the engine\n\nTasks (make actual subtasks later):\n\n- display sprites\n\n- handle inputs\n\n- physics`,
				status: "todo",
				type: "feature",
			},
		],
	},
];

const database = new ElRouter();

database.get("/board", async () => {
	return ElResponse.OK(deepCopy(sampleBoards));
});

database.get("/board/{}", async (params) => {
	const board = sampleBoards.filter((it) => it.id === params?.param0);
	return board.length
		? ElResponse.OK(deepCopy(board))
		: ElResponse.NotFound(board);
});

database.post("/board/{}", async (params) => {
	if (typeof params?.param0 !== "string" || params.param0.match(/\s/))
		return ElResponse.BadRequest({ error: "bad url parameter" });
	const board = sampleBoards.filter((it) => it.id === params?.param0);
	if (board.length)
		return ElResponse.Conflict({
			error: `board ${params.param0} already exists`,
		});
	sampleBoards.push({
		id: params.param0,
		name: params.name ?? params.param0,
		description: params.description || "",
		issues: [],
	});
	return ElResponse.OK({});
});

database.put("/board/{}", async (params) => {
	if (typeof params?.param0 !== "string" || params.param0.match(/\s/))
		return ElResponse.BadRequest({ error: "bad url parameter" });
	const index = sampleBoards.findIndex((it) => it.id === params?.param0);
	if (index === -1)
		return ElResponse.NotFound({
			error: `board ${params.param0} doesn't exists`,
		});
	sampleBoards[index] = {
		id: sampleBoards[index].id,
		name: params.name ?? sampleBoards[index].name,
		description: params.description ?? sampleBoards[index].description,
		issues: params.issues ?? sampleBoards[index].issues,
	};
	return ElResponse.OK({});
});

export default database.API;

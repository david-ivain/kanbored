/**
 * @module BoardAPI
 */

const Utils = require("../utils/Utils");

/** @type {Board[]} */
const sampleBoards = [
	{
		id: "kanbored",
		name: "Kanbored",
		description:
			"Kanban board and more.<br/>Probably priority management in the future as well.",
		issues: [
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "todo",
				type: "improvement",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "review",
				type: "bug",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "done",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "wip",
				type: "feature",
			},
			{
				id: "makedashboard",
				name: "Make Dashboard",
				description: `Make the dashboard<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>view boards
				<li>go to board
				<li>manage boards
				</ul>`,
				status: "review",
				type: "feature",
			},
		],
	},
	{
		id: "platformer",
		name: "Platformer assignment",
		description:
			"Platformer game project.<br/>Still not started or planned.",
		issues: [
			{
				id: "makeengine",
				name: "Make Engine",
				description: `Make the engine<br/>
				Tasks (make actual subtasks later):
				<ul class="list-disc list-inside">
				<li>display sprites
				<li>handle inputs
				<li>physics
				</ul>`,
				status: "todo",
				type: "feature",
			},
		],
	},
];

/** @type {API<Board>} */
const BoardAPI = {
	async get(id) {
		if (!id) return Utils.deepCopy(sampleBoards);
		return Utils.deepCopy(sampleBoards.filter((it) => it.id === id));
	},
};

module.exports = BoardAPI;

/**
 * @module BoardAPI
 */

const Utils = require("../utils/Utils");

/** @type {Board[]} */
const sampleBoards = [
	{ id: "kanbored", name: "Kanbored" },
	{ id: "platformer", name: "Platformer assignment" },
];

/** @type {API<Board>} */
const BoardAPI = {
	async get(id) {
		if (!id) return Utils.deepCopy(sampleBoards);
		return Utils.deepCopy(sampleBoards.filter((it) => it.id === id));
	},
};

module.exports = BoardAPI;

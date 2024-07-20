/**
 * @module Utils
 */

/**
 * @param {Object} object
 */
function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

const Utils = {
	deepCopy,
};

module.exports = Utils;

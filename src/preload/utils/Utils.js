/**
 * @param {Object} object
 */
export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

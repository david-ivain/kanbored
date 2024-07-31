/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * If the passed value is HTMLElement, returns it. Otherwise, returns null
 * @param {any} maybeElement
 * @returns { HTMLElement | null }
 */
export function toHTMLElementOrNull(maybeElement) {
	if (maybeElement instanceof HTMLElement) return maybeElement;
	return null;
}

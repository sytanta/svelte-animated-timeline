/**
 * Calculate an element's top & left position values relative to its parent element
 */
export const calcElmPosition = (elmRef: HTMLElement, parentElmRef: HTMLElement) => {
	const elmRect = elmRef.getBoundingClientRect();
	const parentRect = parentElmRef.getBoundingClientRect();

	return {
		top: elmRect.top - parentRect.top + elmRect.height / 2,
		left: elmRect.left - parentRect.left + elmRect.width / 2
	};
};

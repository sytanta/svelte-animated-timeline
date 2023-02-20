import { setContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import { calcElmPosition } from './utils/calculateElementPosition';

interface TimelineElementData {
	id: string;
	topLeft: number;
	inView: boolean;
	next: TimelineElementData | null;
	previous: TimelineElementData | null;
}

interface UpdatedTLElmParams {
	elm: HTMLElement | null;
	elmId: string;
	isInView?: boolean;
	recalculateTopLeft?: boolean;
}

export function createContext(
	containerElmId: string,
	mode: 'vertical' | 'horizontal',
	triggerOnce: boolean = true,
	lineAmongTimelineElementsOnly: boolean = true
) {
	let containerElm: HTMLElement | null = null;

	/**
	 * Doubly linked-list to store timeline elements' data
	 * This is re-calculated on resize event
	 */
	const elementsStore = writable<{
		head: TimelineElementData | null;
		tail: TimelineElementData | null;
		[key: string]: TimelineElementData | null;
	}>({ head: null, tail: null });

	/**
	 * Calculate timeline line's length
	 * If "lineAmongTimelineElementsOnly" is truthy, it is the distance
	 * between the first element and the last visible element
	 */
	const latestPositionStore = derived(elementsStore, (elements) => {
		let latestElm: TimelineElementData | null = elements.tail;
		while (latestElm && !latestElm.inView) {
			latestElm = latestElm.previous;
		}

		const topLeft = latestElm?.topLeft;
		if (topLeft == undefined) return 0;

		if (lineAmongTimelineElementsOnly) {
			return topLeft - (elements.head?.topLeft || 0);
		} else if (latestElm?.id && latestElm.id === elements.tail?.id) {
			return mode === 'vertical' ? containerElm?.scrollHeight : containerElm?.scrollWidth;
		}

		return topLeft;
	});

	/**
	 * Calculate each timeline element's data
	 * This runs once per element
	 */
	function updateElementsStore({
		elm,
		elmId,
		isInView = true,
		recalculateTopLeft = false
	}: UpdatedTLElmParams) {
		if (!elm || !elmId) return;

		elementsStore.update((pre) => {
			let head = pre.head;
			let tail = pre.tail;

			const elementObj: TimelineElementData = pre[elmId] || {
				id: elmId,
				topLeft: pre[elmId]?.topLeft ?? -1,
				next: null,
				previous: null,
				inView: isInView
			};

			if (!Object.hasOwn(pre, elmId) || recalculateTopLeft) {
				if (!containerElm) containerElm = document.getElementById(containerElmId);
				const { top, left } = calcElmPosition(elm, containerElm!);

				elementObj.topLeft = mode === 'vertical' ? top : left;

				if (tail) {
					let previous: TimelineElementData | null = tail;
					let next: TimelineElementData | null = null;

					while (previous && previous.topLeft > elementObj.topLeft) {
						next = previous;
						previous = previous.previous;
					}

					if (!previous) {
						elementObj.next = head;
						if (head) head.previous = elementObj;

						head = elementObj;
					} else if (!next) {
						elementObj.previous = tail;
						tail.next = elementObj;

						tail = elementObj;
					} else {
						previous.next = elementObj;
						next.previous = elementObj;

						elementObj.previous = previous;
						elementObj.next = next;
					}
				}

				if (!head) {
					head = elementObj;
					tail = elementObj;
				}
			}

			if (!recalculateTopLeft) elementObj.inView = isInView;

			return Object.assign({}, pre, { head, tail, [elmId]: elementObj });
		});
	}

	/**
	 * Re-calculate timeline elements' "topLeft" value
	 * This can run on window's resize event
	 */
	function recalculateElementsTopleft() {
		elementsStore.update((pre) => {
			for (let elmId in pre) {
				if (!Object.hasOwn(pre, elmId) || elmId === 'head' || elmId === 'tail') continue;

				const { top, left } = calcElmPosition(document.getElementById(elmId)!, containerElm!);
				pre[elmId]!.topLeft = mode === 'vertical' ? top : left;
			}

			return pre;
		});
	}

	setContext('svelteTimelineContext', {
		latestPositionStore,
		updateElementsStore,
		recalculateElementsTopleft,
		triggerOnce
	});

	return { elementsStore, latestPositionStore, recalculateElementsTopleft };
}

<script lang="ts">
	import clsx from 'clsx';

	import { createContext } from './store';

	let className = '';

	export { className as class };
	export let id: string;
	export let animate = true;
	export let animateLine = false;
	export let mode: 'vertical' | 'horizontal' = 'vertical';
	export let layout = '2-columns';
	export let lineColor = '#fff';
	export let triggerOnce: boolean = true;
	export let lineAmongTimelineElementsOnly: boolean = true;

	let containerRef: HTMLDivElement | null = null;
	let transform: string = '';
	let width = animateLine ? '0' : '100%';
	let height = animateLine ? '0' : '100%';

	const { elementsStore, latestPositionStore, recalculateElementsTopleft } = createContext(
		id,
		mode,
		triggerOnce,
		lineAmongTimelineElementsOnly
	);

	$: if (mode === 'vertical') {
		height = containerRef ? $latestPositionStore + 'px' : '0';
		transform = `translate3d(0,  ${
			lineAmongTimelineElementsOnly ? ($elementsStore.head?.topLeft || 0) + 'px' : 0
		}, 0)`;
	} else {
		width = containerRef ? $latestPositionStore + 'px' : '0px';
		transform = `translate3d(${
			lineAmongTimelineElementsOnly ? ($elementsStore.head?.topLeft || 0) + 'px' : 0
		}, 0, 0)`;
	}

	if (typeof window !== 'undefined') {
		document.documentElement.style.setProperty('--line-color', lineColor);
	}
</script>

<svelte:window on:resize={recalculateElementsTopleft} />

<div
	{id}
	bind:this={containerRef}
	class={clsx(
		'svelte-timeline',
		{
			'svelte-timeline--animate': animate,
			'svelte-timeline--two-columns': layout === '2-columns',
			'svelte-timeline--one-column-left': layout === '1-column' || layout === '1-column-left',
			'svelte-timeline--one-column-right': layout === '1-column-right'
		},
		className
	)}
>
	{#if mode === 'vertical'}
		<div class="svelte-timelime-line" style:height style:transform />
	{:else}
		<div class="svelte-timelime-line" style:width style:transform />
	{/if}
	<slot />
</div>

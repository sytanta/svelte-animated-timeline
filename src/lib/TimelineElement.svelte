<script lang="ts">
	import { getContext } from 'svelte';
	import { inview } from 'svelte-inview';
	import clsx from 'clsx';

	import { stringifyStyles } from './utils/stringifyStyles';

	let className = '';

	export { className as class };
	export let id: string;
	export let contentArrowStyle: Record<string, string | number> | undefined = undefined;
	export let date: string = '';
	export let dateClassName: string = '';
	export let iconClassName: string = '';
	export let iconNoDefaultStyle: boolean = false;
	export let iconStyle: Record<string, string> = {};
	export let contentClassName: string = '';
	export let noContentWrapper: boolean = false;
	export let contentStyle: Record<string, string | number> | undefined = undefined;
	export let position: string | undefined = undefined;
	export let visible: boolean = false;

	let iconRef: HTMLElement | null = null;
	let isInView: boolean | undefined = undefined;

	const { updateElementsStore, triggerOnce } = getContext<{
		triggerOnce: boolean;
		updateElementsStore: (arg: {
			elm: HTMLElement | null;
			elmId: string;
			isInView?: boolean;
			recalculateTopLeft?: boolean;
		}) => void;
	}>('svelteTimelineContext');
</script>

<div
	use:inview
	on:enter={() => {
		if (triggerOnce && isInView) return;

		isInView = true;

		updateElementsStore({
			elm: iconRef,
			elmId: id
		});
	}}
	on:leave={() => {
		if (triggerOnce) return;

		isInView = false;

		updateElementsStore({
			elm: iconRef,
			elmId: id,
			isInView: false
		});
	}}
	class={clsx(
		'svelte-timeline-element',
		{
			'svelte-timeline-element--left': position === 'left',
			'svelte-timeline-element--right': position === 'right',
			'svelte-timeline-element--no-children': !$$slots.default
		},
		className
	)}
>
	<button
		{id}
		bind:this={iconRef}
		on:click={() => {}}
		class={clsx(
			'svelte-timeline-element-icon',
			{
				'bounce-in': isInView || visible,
				'is-hidden': !(isInView || visible)
			},
			{ 'no-default-style': iconNoDefaultStyle },
			iconClassName
		)}
		style={stringifyStyles(iconStyle)}
	>
		<slot name="icon" inView={isInView} />
	</button>
	{#if !noContentWrapper}
		<div
			on:click={() => {}}
			on:keyup
			class={clsx(contentClassName, 'svelte-timeline-element-content', {
				'bounce-in': isInView || visible,
				'is-hidden': !(isInView || visible)
			})}
			style={stringifyStyles(contentStyle)}
		>
			<div
				class="svelte-timeline-element-content-arrow"
				style={stringifyStyles(contentArrowStyle)}
			/>
			<slot inView={isInView} />
			<span class={clsx('svelte-timeline-element-date', dateClassName)}>
				{date}
			</span>
		</div>
	{:else}
		<slot inView={isInView} />
	{/if}
</div>

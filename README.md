# svelte-animated-timeline

Timeline component supporting animation, custom icon, vertical & horizontal modes

## Install

```bash
npm i svelte-animated-timeline
```

## Usage

- Basic usage

```bash
<script lang="ts">
    import { Timeline, TimelineElement } from 'svelte-animated-timeline';

	import WorkIcon from '$lib/components/WorkIcon.svelte';
</script>

<Timeline id="timeline" triggerOnce={false} lineColor="#dddddd">
	<TimelineElement
		id="elm1"
		class="svelte-timeline-element--work"
		date="2011 - present"
		contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
		contentArrowStyle={{ 'border-right': '7px solid  rgb(33, 150, 243)' }}
		iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
	>
		<WorkIcon slot="icon" />
		<h3 class="svelte-timeline-element-title">Creative Director</h3>
		<h4 class="svelte-timeline-element-subtitle">Miami, FL</h4>
		<p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
	</TimelineElement>
	<TimelineElement
		id="elm2"
		class="svelte-timeline-element--work"
		date="2010 - 2011"
		iconNoDefaultStyle
		iconStyle={{ background: 'red', 'border-radius': '50%' }}
		contentStyle={{ background: 'papayawhip' }}
	>
		<WorkIcon slot="icon" />
		<h3 class="svelte-timeline-element-title">Art Director</h3>
		<h4 class="svelte-timeline-element-subtitle">San Francisco, CA</h4>
		<p>Creative Direction, User Experience, Visual Design, SEO, Online Marketing</p>
	</TimelineElement>
</Timeline>
```

- Full line timeline

```bash
<script lang="ts">
    import { Timeline, TimelineElement } from 'svelte-animated-timeline';

	import WorkIcon from '$lib/components/WorkIcon.svelte';
</script>

<Timeline id="timeline" triggerOnce={false} lineAmongTimelineElementsOnly={false}>
	<TimelineElement
		id="elm1"
		class="svelte-timeline-element--work"
		date="2011 - present"
		contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
		contentArrowStyle={{ 'border-right': '7px solid  rgb(33, 150, 243)' }}
		iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
	>
		<WorkIcon slot="icon" />
		<h3 class="svelte-timeline-element-title">Creative Director</h3>
		<h4 class="svelte-timeline-element-subtitle">Miami, FL</h4>
		<p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
	</TimelineElement>
	<TimelineElement
		id="elm2"
		class="svelte-timeline-element--work"
		date="2010 - 2011"
		iconNoDefaultStyle
		iconStyle={{ background: 'red', 'border-radius': '50%' }}
		contentStyle={{ background: 'papayawhip' }}
	>
		<WorkIcon slot="icon" />
		<h3 class="svelte-timeline-element-title">Art Director</h3>
		<h4 class="svelte-timeline-element-subtitle">San Francisco, CA</h4>
		<p>Creative Direction, User Experience, Visual Design, SEO, Online Marketing</p>
	</TimelineElement>
</Timeline>
```

<script lang="ts">
	import Timeline from '$lib/Timeline.svelte';
	import TimelineElement from '$lib/TimelineElement.svelte';

	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import WorkIcon from './components/WorkIcon.svelte';
	import SchoolIcon from './components/SchoolIcon.svelte';
	import StarIcon from './components/StarIcon.svelte';
</script>

<svelte:head>
	<title>svelte-animated-timeline</title>
</svelte:head>

<Header />

<main>
	<Timeline id="tl1" triggerOnce={false} lineColor="#dddddd">
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
		<TimelineElement
			id="elm3"
			class="svelte-timeline-element--work"
			date="2008 - 2010"
			iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
			contentStyle={{ background: 'papayawhip' }}
		>
			<WorkIcon slot="icon" />
			<h3 class="svelte-timeline-element-title">Web Designer</h3>
			<h4 class="svelte-timeline-element-subtitle">Los Angeles, CA</h4>
			<p>User Experience, Visual Design</p>
		</TimelineElement>
		<TimelineElement
			id="elm4"
			class="svelte-timeline-element--work"
			date="2006 - 2008"
			iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
			contentStyle={{ background: 'papayawhip' }}
		>
			<WorkIcon slot="icon" />
			<h3 class="svelte-timeline-element-title">Web Designer</h3>
			<h4 class="svelte-timeline-element-subtitle">San Francisco, CA</h4>
			<p>User Experience, Visual Design</p>
		</TimelineElement>
		<TimelineElement
			id="elm5"
			class="svelte-timeline-element--education"
			date="April 2013"
			contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
			contentArrowStyle={{ 'border-right': '7px solid  rgb(233, 30, 99)' }}
			iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
		>
			<SchoolIcon slot="icon" />
			<h3 class="svelte-timeline-element-title">
				Content Marketing for Web, Mobile and Social Media
			</h3>
			<h4 class="svelte-timeline-element-subtitle">Online Course</h4>
			<p>Strategy, Social Media</p>
		</TimelineElement>
		<TimelineElement
			id="elm6"
			class="svelte-timeline-element--education"
			date="November 2012"
			iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
			contentStyle={{ background: 'papayawhip' }}
		>
			<SchoolIcon slot="icon" />
			<h3 class="svelte-timeline-element-title">Agile Development Scrum Master</h3>
			<h4 class="svelte-timeline-element-subtitle">Certification</h4>
			<p>Creative Direction, User Experience, Visual Design</p>
		</TimelineElement>
		<TimelineElement
			id="elm7"
			class="svelte-timeline-element--education"
			date="2002 - 2006"
			iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
			contentStyle={{ background: 'papayawhip' }}
		>
			<SchoolIcon slot="icon" />
			<h3 class="svelte-timeline-element-title">
				Bachelor of Science in Interactive Digital Media Visual Imaging
			</h3>
			<h4 class="svelte-timeline-element-subtitle">Bachelor Degree</h4>
			<p>Creative Direction, Visual Design</p>
		</TimelineElement>
		<TimelineElement id="elm8" iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}>
			<StarIcon slot="icon" />
		</TimelineElement>
	</Timeline>
</main>

<Footer />

<style>
	:global(.svelte-timeline-element--work .svelte-timeline-element-content) {
		border-top: 3px solid #2196f3;
	}
	:global(.svelte-timeline-element--education .svelte-timeline-element-content) {
		border-top: 3px solid #e91e63;
	}
</style>

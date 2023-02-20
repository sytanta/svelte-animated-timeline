import type { ComponentType } from 'svelte';

export interface TimelineItem {
	id: string;
	className: string;
	contentArrowStyle?: Record<string, string | number>;
	date?: string;
	dateClassName?: string;
	iconComponent: ComponentType;
	iconClassName?: string;
	noIconWrapper?: boolean;
	contentComponent?: ComponentType;
	contentClassName?: string;
	noContentWrapper?: boolean;
	contentStyle?: Record<string, string | number>;
	position?: string;
	visible?: boolean;
	triggerOnce?: boolean;
}

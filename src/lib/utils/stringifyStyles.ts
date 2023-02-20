export function stringifyStyles(styles: Record<string, string | number> | undefined) {
	if (!styles) return '';

	return Object.entries(styles).reduce((acc, [prop, val]) => {
		acc += `${prop}:${val};`;
		return acc;
	}, '');
}

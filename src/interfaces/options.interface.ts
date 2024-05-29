export const Options = {
	today: "today",
	help: "help",
	version: "version",
	forecast: "forecast",
} as const;

export interface HelpOption {
	help: string;
	h: string;
}

export interface VersionOption {
	version: string;
	v: string;
}

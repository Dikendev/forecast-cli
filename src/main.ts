#!/usr/bin/env node
import minimist from "minimist";
import { Help } from "./help";
import { Today } from "./cmds/today";
import { version } from "./version";

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

export interface CommandLineOptions extends HelpOption, VersionOption {
	today: string;
}

export type Commands = keyof typeof Options;

(() => {
	const args = minimist(process.argv.slice(2));
	let cmd = (args._[0] as Commands) || Options.help;

	const cast = args as unknown as CommandLineOptions;

	if (cast.version || cast.v) {
		cmd = Options.version;
	}

	if (cast.help || cast.h) {
		cmd = Options.help;
	}

	switch (cmd) {
		case Options.today:
			const today = new Today();
			today.getToday();
			console.log("Today is sunny!");
			break;
		case Options.help:
			console.log("Help menu", cast);
			Help.menu(args);
			break;
		case Options.version:
			version();
			break;
		default:
			console.error(`"${cmd}" is not a valid command!`);
			break;
	}
})();

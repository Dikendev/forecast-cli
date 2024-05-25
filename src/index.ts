#!/usr/bin/env node
import minimist from "minimist";
import { Help } from "./help";

export const Options = {
	help: "help",
	version: "version",
} as const;

export type Options = typeof Options;

export interface HelpOption {
	help: string;
	h: string;
}

export interface VersionOption {
	version: string;
	v: string;
}

export interface CommandLineOptions extends HelpOption, VersionOption {}

export type Commands = keyof typeof Options;

(() => {
	console.log("Hello CLI");
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
		case Options.help:
			Help.showHelp();
			break;
		case Options.version:
			console.log("Version executed");
			break;
		default:
			console.error(`"${cmd}" is not a valid command!`);
			break;
	}
})();

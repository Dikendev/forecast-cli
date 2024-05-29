#!/usr/bin/env node
import minimist from "minimist";
import { Help } from "./help";
import { Today } from "./cmd/today";
import { version } from "./version";
import { Options } from "./interfaces/options.interface";
import { Commands, CommandLineOptions } from "./interfaces/command.interface";

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

#!/usr/bin/env node
import minimist from "minimist";
import { Help } from "./help";
import { Today } from "./cmd/today";
import { version } from "./version";
import { Options } from "./interfaces/options.interface";
import { Commands, CommandLineOptions } from "./interfaces/command.interface";
import { States } from "./cmd/states";
import Table from "cli-table3";
import { FilteredWeatherData } from "./service/interfaces/open-weather.interface";

export interface TableData {
	[key: string]: string;
}

function convertToArray(response: FilteredWeatherData): TableData[] {
	const data = Object.entries(response).map(([key, value]) => ({
		[key]: value,
	}));
	return data;
}

const printResponse = (response: FilteredWeatherData) => {
	var table = new Table();

	const data = convertToArray(response);

	data.forEach((item) => {
		table.push(item);
	});
	console.log(table.toString());
};

(async () => {
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
			const response = await today.getToday(args);

			if (!response) {
				console.error("Something went wrong");
				return;
			}

			printResponse(response);
			break;
		case Options.help:
			Help.menu(args);
			break;
		case Options.version:
			version();
			break;
		case Options.state:
			const states = new States();
			states.getStates();
			break;
		default:
			console.error(`"${cmd}" is not a valid command!`);
			break;
	}
})();

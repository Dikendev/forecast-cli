import minimist from "minimist";

export interface MenuOptions {
	[key: string]: string;
}

const menus: MenuOptions = {
	main: `
			weather [command] <options>
			today .............. show weather for today
			forecast ........... show 10-day weather forecast
			states ............. show list of states
			version ............ show package version
			help ............... show help menu for a command`,
	today: `
			weather today <options>
			--location, -l ..... the location to use`,
};

export class Help {
	static menu(args: minimist.ParsedArgs) {
		const valid = args._.find((arg) => arg.includes("today"));

		switch (valid) {
			case "main":
				console.log(menus.main);
				break;
			case "today":
				console.log(menus[valid]);
				break;
			default:
				console.log(menus.main);
				break;
		}
	}
}

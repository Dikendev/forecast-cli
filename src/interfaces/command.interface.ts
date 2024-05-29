import { HelpOption, VersionOption, Options } from "./options.interface";

export interface CommandLineOptions extends HelpOption, VersionOption {
	today: string;
}

export type Commands = keyof typeof Options;

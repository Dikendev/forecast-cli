#!/usr/bin/env node
import minimist from "minimist";

(() => {
	console.log("Hello CLI");
	const args = minimist(process.argv.slice(2));
	console.log(args);
})();

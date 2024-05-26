const { name, version, author } = require("../package.json");

export class Version {
	static show() {
		console.log(`${name}, V${version}, author: ${author}`);
	}
}

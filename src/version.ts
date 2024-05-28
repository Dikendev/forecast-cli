import fs from "fs";
import path from "path";

export const version = () => {
	const packageJson = path.resolve(__dirname, "../package.json");
	const content = fs.readFileSync(packageJson, { encoding: "utf-8" });
	const { name, version, author } = JSON.parse(content);
	console.log(`${name}, V${version}, author: ${author}`);
};

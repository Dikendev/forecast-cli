#!/usr/bin/env npx ts-node
import { Weather } from "../service/weather";
import cliSpinners from "cli-spinners";

export class Today {
	weather: Weather;
	constructor() {
		this.weather = new Weather();
	}

	async getToday() {
		console.log(cliSpinners.dots);
		try {
			const response = await this.weather.getWeather();
			console.log(response);
		} catch (error) {
			console.error("Error fetching today's weather", error);
		}
	}
}
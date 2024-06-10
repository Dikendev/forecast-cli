#!/usr/bin/env npx ts-node
import minimist from "minimist";
import { Weather } from "../service/weather";
import { States, StatesFiltered } from "./states";
import {
	FilteredWeatherData,
	OpenWeatherApi,
} from "../service/interfaces/open-weather.interface";

const VALID_ARGS = ["location"];

export class Today {
	weather: Weather;

	constructor() {
		this.weather = new Weather();
	}

	async getToday(args: minimist.ParsedArgs) {
		const filterArgs = Object.keys(args).filter((key) => key !== "_");

		let notValidArgs: string[] = [];

		const isValidArg = filterArgs
			.map((arg) => {
				if (!VALID_ARGS.includes(arg)) {
					notValidArgs = notValidArgs.concat(arg);
					return null;
				}
				return arg;
			})
			.filter(Boolean)[0];

		if (notValidArgs.length > 0) {
			console.error(`"${notValidArgs.join(", ")}" is not a valid argument!`);
			return;
		}

		if (
			!isValidArg ||
			isValidArg === null ||
			isValidArg.length === 0 ||
			isValidArg === undefined
		) {
			console.error("Please provide a location");
			return;
		}

		const location = args[isValidArg];
		const states = new States();
		const city = await states.getStates();

		const foundLocation = this.findLocation(location, city);

		if (!foundLocation) {
			console.error("Please provide a valid location");
			return;
		}

		try {
			const response = await this.weather.getWeather(
				foundLocation.lat,
				foundLocation.long,
				"metric"
			);

			const filteredData = this.filterWeatherData(response);

			return filteredData;
		} catch (error) {
			console.error("Error fetching today's weather", error);
		}
	}

	findLocation(
		location: string,
		city: StatesFiltered[]
	): StatesFiltered | undefined {
		const foundLocation = city.find((state) =>
			state.name.includes(location.toLowerCase())
		);

		if (!foundLocation) {
			console.error(`Location ${location} not found`);
			return;
		}

		return foundLocation;
	}

	filterWeatherData(response: OpenWeatherApi): FilteredWeatherData {
		const wind = response.wind;

		return {
			name: response.name,
			description: response.weather[0].description,
			temp: response.main.temp,
			feels_like: response.main.feels_like,
			temp_min: response.main.temp_min,
			temp_max: response.main.temp_max,
			humidity: response.main.humidity,
			speed: wind.speed,
			deg: wind.deg,
			gust: wind.gust,
		};
	}
}

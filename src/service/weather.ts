import axios from "axios";
import { WeatherResponse } from "./interfaces/weather.interface";

// export const COORDINATES = {
// 	"jaragua do sul": {
// 		latitude: -26.4853,
// 		longitude: -49.0672,
// 	},
// } as const;

export interface Metrics {
	standard: string;
	metric: string;
	imperial: string;
}

export const METRICS: Metrics = {
	standard: "standard",
	metric: "metric",
	imperial: "imperial",
} as const;

export class WeatherParams {
	constructor(
		public readonly lat: number,
		public readonly lon: number,
		public readonly units: string
	) {}
}

export class Weather {
	constructor() {}

	async getWeather(): Promise<WeatherResponse> {
		// const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coordinates}&apikey=WezdiiKDlXT2ceg1POgROArCJfJKgT0F`;

		const coordinates = new WeatherParams(-26.4853, -49.0672, METRICS.metric);
		console.log("coordinates", coordinates);

		const params = getParams(coordinates);
		console.log("params", params);

		const token = process.env.OPEN_WEATHER_TOKEN;
		console.log("token", token);

		const url = `https:api.openweathermap.org/data/2.5/weather?${params}&appid=${token}`;

		try {
			const result = await axios.get<WeatherResponse>(url);

			if (!result.data) {
				throw new Error("No data returned from the weather API");
			}

			return result.data;
		} catch (error) {
			console.error("Error fetching weather data", error);
			throw error;
		}
	}
}

function getParams(params: any) {
	const arrParams = Object.keys(params)
		.filter((p) => params[p])
		.map((k) => `${k}=${params[k]}`);
	return arrParams.length > 0 ? `${arrParams.join("&")}` : "";
}

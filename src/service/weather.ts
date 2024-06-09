import axios from "axios";
import { WeatherResponse } from "./interfaces/weather.interface";
import { METRICS, MetricsType } from "../constants/metrics.constant";
import dotenv from "dotenv";
dotenv.config();

export class WeatherParams {
	constructor(
		public readonly lat: number,
		public readonly lon: number,
		public readonly units: MetricsType
	) {}
}

export class Weather {
	token!: string;
	openweatherMapApi!: string;

	constructor() {
		this.setToken();
		this.setApi();
	}

	async setApi(): Promise<void> {
		const openWeatherMapApi = process.env.OPEN_WEATHER_API;

		if (!openWeatherMapApi) {
			this.logTokenNotFound();
			return;
		}

		this.openweatherMapApi = openWeatherMapApi;
	}

	async setToken(): Promise<void> {
		const token = process.env.OPEN_WEATHER_TOKEN;

		if (!token) {
			this.logTokenNotFound();
			return;
		}

		this.token = token;
	}

	logTokenNotFound() {
		console.log("Token not found");
	}

	async getWeather(
		lat: number,
		long: number,
		metrics: MetricsType
	): Promise<WeatherResponse> {
		// const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coordinates}&apikey=WezdiiKDlXT2ceg1POgROArCJfJKgT0F`;

		const coordinates = new WeatherParams(lat, long, metrics);

		const params = getParams(coordinates);

		const url = `${this.openweatherMapApi}/data/2.5/weather?${params}&appid=${this.token}`;

		try {
			const result = await axios.get<WeatherResponse>(url);

			if (!result.data) {
				throw new Error("No data returned from the weather API");
			}

			return result.data;
		} catch (error) {
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

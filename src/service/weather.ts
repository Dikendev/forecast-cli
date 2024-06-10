import axios from "axios";
import { WeatherResponse } from "./interfaces/weather.interface";
import { METRICS, Metrics } from "../constants/metrics.constant";
import dotenv from "dotenv";
import { OpenWeatherApi } from "./interfaces/open-weather.interface";
dotenv.config();

export class WeatherParams {
	constructor(
		public readonly lat: string,
		public readonly lon: string,
		public readonly units: Metrics
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
		lat: string,
		long: string,
		metrics: Metrics
	): Promise<OpenWeatherApi> {
		const coordinates = new WeatherParams(lat, long, metrics);
		const params = getParams(coordinates);
		const url = `${this.openweatherMapApi}/data/2.5/weather?${params}&appid=${this.token}`;

		try {
			const result = await axios.get<OpenWeatherApi>(url);

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

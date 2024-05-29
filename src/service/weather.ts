import axios from "axios";
import { WeatherResponse } from "./interfaces/weather.interface";

export class Weather {
	constructor() {}

	async getWeather(): Promise<WeatherResponse> {
		const coordinates = "jaragua%20do%20sul";
		const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coordinates}&apikey=WezdiiKDlXT2ceg1POgROArCJfJKgT0F`;

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

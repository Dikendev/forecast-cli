import axios from "axios";

export interface WeatherResponse {
	timelines: Timeline;
	location: Location;
}

export interface Timeline {
	hourly: TimeLineValues;
	minutely: TimeLineValues;
	daily: TimeLineValues;
}

export interface TimeLineValues {
	time: string;
	values: Values;
}

export interface Values {
	cloudBaseAvg: number;
	cloudBaseMax: number;
	cloudBaseMin: number;
	cloudCeilingAvg: number;
	cloudCeilingMax: number;
	cloudCeilingMin: number;
	cloudCoverAvg: number;
	cloudCoverMax: number;
	cloudCoverMin: number;
	dewPointAvg: number;
	dewPointMax: number;
	dewPointMin: number;
	evapotranspirationAvg: number;
	evapotranspirationMax: number;
	evapotranspirationMin: number;
	evapotranspirationSum: number;
	freezingRainIntensityAvg: number;
	freezingRainIntensityMax: number;
	freezingRainIntensityMin: number;
	humidityAvg: number;
	humidityMax: number;
	humidityMin: number;
	iceAccumulationAvg: number;
	iceAccumulationLweAvg: number;
	iceAccumulationLweMax: number;
	iceAccumulationLweMin: number;
	iceAccumulationMax: number;
	iceAccumulationMin: number;
	iceAccumulationSum: number;
	moonriseTime: string;
	moonsetTime: string;
	precipitationProbabilityAvg: number;
	precipitationProbabilityMax: number;
	precipitationProbabilityMin: number;
	pressureSurfaceLevelAvg: number;
	pressureSurfaceLevelMax: number;
	pressureSurfaceLevelMin: number;
	rainAccumulationAvg: number;
	rainAccumulationLweAvg: number;
	rainAccumulationLweMax: number;
	rainAccumulationLweMin: number;
	rainAccumulationMax: number;
	rainAccumulationMin: number;
	rainAccumulationSum: number;
	rainIntensityAvg: number;
	rainIntensityMax: number;
	rainIntensityMin: number;
	sleetAccumulationAvg: number;
	sleetAccumulationLweAvg: number;
	sleetAccumulationLweMax: number;
	sleetAccumulationLweMin: number;
	sleetAccumulationMax: number;
	sleetAccumulationMin: number;
	sleetIntensityAvg: number;
	sleetIntensityMax: number;
	sleetIntensityMin: number;
	snowAccumulationAvg: number;
	snowAccumulationLweAvg: number;
	snowAccumulationLweMax: number;
	snowAccumulationLweMin: number;
	snowAccumulationMax: number;
	snowAccumulationMin: number;
	snowAccumulationSum: number;
	snowIntensityAvg: number;
	snowIntensityMax: number;
	snowIntensityMin: number;
	sunriseTime: string;
	sunsetTime: string;
	temperatureApparentAvg: number;
	temperatureApparentMax: number;
	temperatureApparentMin: number;
	temperatureAvg: number;
	temperatureMax: number;
	temperatureMin: number;
	uvHealthConcernAvg: number;
	uvHealthConcernMax: number;
	uvHealthConcernMin: number;
	uvIndexAvg: number;
	uvIndexMax: number;
	uvIndexMin: number;
	visibilityAvg: number;
	visibilityMax: number;
	visibilityMin: number;
	weatherCodeMax: number;
	weatherCodeMin: number;
	windDirectionAvg: number;
	windGustAvg: number;
	windGustMax: number;
	windGustMin: number;
	windSpeedAvg: number;
	windSpeedMax: number;
	windSpeedMin: number;
}

export interface Location {
	lat: number;
	lon: number;
	name: string;
	type: string;
}

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

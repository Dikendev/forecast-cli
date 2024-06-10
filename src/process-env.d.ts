declare global {
	namespace NodeJS {
		interface ProcessEnv {
			WEATHER_API: string;
			OPEN_WEATHER_TOKEN: string;
			OPEN_WEATHER_API: string;
			GEO_API: string;
		}
	}
}

export {};

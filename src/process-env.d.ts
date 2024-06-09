declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			WEATHER_API: string;
			OPEN_WEATHER_TOKEN: string;
			OPEN_WEATHER_API: string;
		}
	}
}

export {};

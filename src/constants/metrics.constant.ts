import { MetricsType } from "../interfaces/metrics.interface";

export const METRICS: MetricsType = {
	standard: "standard",
	metric: "metric",
	imperial: "imperial",
};

export type Metrics = keyof typeof METRICS;

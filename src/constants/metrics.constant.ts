import { Metrics } from "../interfaces/metrics.interface";

export const METRICS: Metrics = {
	standard: "standard",
	metric: "metric",
	imperial: "imperial",
} as const;

export type MetricsType = keyof typeof METRICS;

export interface StateData {
	totalResultsCount: number;
	geonames: GeoNames[];
}

export interface GeoNames {
	adminCode1: string;
	lng: string;
	geonameId: number;
	toponymName: string;
	countryId: string;
	fcl: string;
	population: number;
	countryCode: string;
	name: string;
	fclName: string;
	adminCodes1: object;
	countryName: string;
	fcodeName: string;
	adminName1: string;
	lat: string;
	fcode: string;
}

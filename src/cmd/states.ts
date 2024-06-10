import axios from "axios";
import { StateData } from "../interfaces/states.interface";
// import Spinner from "tiny-spinner";

export interface StatesFiltered {
	id: number;
	name: string;
	lat: string;
	long: string;
}

const JARAGUA_CITY_ID = "3450387";

export class States {
	constructor() {}

	async getStates(id: string = JARAGUA_CITY_ID): Promise<StatesFiltered[]> {
		const apiEnv = process.env.GEO_API;

		const url = `${apiEnv}?geonameId=${id}`;

		try {
			const { data } = await axios.get<StateData>(url);
			const filterStates = this.filterStates(data);
			return filterStates;
		} catch (error) {
			throw `Error fetching states: ${error}`;
		}
	}

	private filterStates(states: StateData): StatesFiltered[] {
		return states.geonames.map((state) => {
			return {
				name: state.toponymName.replace(/\s+/g, "").toLowerCase(),
				lat: state.lat,
				long: state.lng,
				id: state.geonameId,
			};
		});
	}
}

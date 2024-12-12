import { AxiosResponse } from "axios";
import api from "../configs/axios/http-common";
import { Location } from "../models/location.model";
import { LocationFilter, PageableFilter } from "../vo/types/filters";
import { Page } from "../vo/types/types";
import { createRequestParams } from "../utils/utils";

const LOCATION_PATH: string = 'location';

export const findAllLocations = (locationFilter: PageableFilter<LocationFilter>): Promise<AxiosResponse<Page<Location>>> => {
    return api.get<Page<Location>>(LOCATION_PATH, { params: createRequestParams(locationFilter) });
}

export const findLocationById = (id: number): Promise<AxiosResponse<Location>> => {
    return api.get<Location>(`${LOCATION_PATH}/${id}`);
}
import api from "../configs/axios/http-common";
import { Person } from "../models/person.model";
import { Location } from "../models/location.model";

const USER_PATH: string = 'user';

export const findCurrent = (): Promise<Person | Location> => {
    return api.get<Person | Location>(`${USER_PATH}/current`)
        .then(response => response.data);
}
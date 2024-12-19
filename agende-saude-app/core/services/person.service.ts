import api from "../configs/axios/http-common";
import { Person } from "../models/person.model";

const PERSON_PATH: string = 'person';

export const createPerson = (person: Person): Promise<Person> => {
    return api.post<Person>(PERSON_PATH, person)
        .then(response => response.data);
}

export const findPersonById = (id: number): Promise<Person> => {
    return api.get<Person>(`${PERSON_PATH}/${id}`)
        .then(response => response.data);
}

export const existsByTaxId = (taxId: string): Promise<boolean> => {
    return api.get<boolean>(`${PERSON_PATH}/exists-by-tax-id/${taxId}`)
        .then(response => response.data);
}

export const updatePerson = (person: Person): Promise<void> => {
    return api.put<void>(`${PERSON_PATH}/${person.id}`, person)
        .then(response => response.data);
}
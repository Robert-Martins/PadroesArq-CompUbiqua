import { Screening } from "../models/screening.model";
import api from "../configs/axios/http-common";

const SCREENING_PATH: string = 'screening';

export const sendScreeningAnswers = (screening: Screening): Promise<Screening> => {
    return api.post<Screening>(`${SCREENING_PATH}/answers`, screening)
        .then(response => response.data);
}

export const getScreeningQuestions = (): Promise<string[]> => {
    return api.get<string[]>(`${SCREENING_PATH}/questions`)
        .then(response => response.data);
}
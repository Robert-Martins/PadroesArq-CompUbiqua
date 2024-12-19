import { Screening } from "../models/screening.model";
import api from "../configs/axios/http-common";
import { ScreeningQuestionnaire, ScreeningQuestionnaireAnswer } from "../vo/types/types";

const SCREENING_PATH: string = 'screening';

export const sendScreeningAnswers = (screening: Screening): Promise<Screening> => {
    return api.post<Screening>(`${SCREENING_PATH}/answers`, screening)
        .then(response => response.data);
}

export const getScreeningQuestions = (): Promise<ScreeningQuestionnaire[]> => {
    return api.get<ScreeningQuestionnaire[]>(`${SCREENING_PATH}/questions`)
        .then(response => response.data);
}

export const getAnsweredScreening = (screeningId: number): Promise<ScreeningQuestionnaireAnswer[]> => {
    return api.get<ScreeningQuestionnaireAnswer[]>(`${SCREENING_PATH}/${screeningId}/answered`)
        .then(response => response.data);
}
import api from "../configs/axios/http-common";
import { Consultation } from "../models/consultation.model";
import { Page } from "../vo/types/types";
import { ConsultationFilter, PageableFilter } from "../vo/types/filters";
import { createRequestParams } from "../utils/utils";
import { Optional } from "../utils/optional";

const CONSULTATION_PATH: string = 'consultation';

export const findAllCommonConsultations = (consultationFilter: PageableFilter<ConsultationFilter>): Promise<Page<Consultation>> => {
    return api.get<Page<Consultation>>(CONSULTATION_PATH, { params: createRequestParams(consultationFilter) })
        .then(response => response.data);
}

export const findConsultationById = (id: number): Promise<Consultation> => {
    return api.get<Consultation>(`${CONSULTATION_PATH}/${id}`)
        .then(response => response.data);
}

export const findAllCommonConsultationsByLocationId = (locationId: number, page: number, size: number): Promise<Page<Consultation>> => {
    return api.get<Page<Consultation>>(`${CONSULTATION_PATH}/location/${locationId}`, { params:{
        page: Optional.ofNullable(page).map(p => p.toString()).orElse('1'),
        size: Optional.ofNullable(size).map(s => s.toString()).orElse('10'),
    }}).then(response => response.data);
}
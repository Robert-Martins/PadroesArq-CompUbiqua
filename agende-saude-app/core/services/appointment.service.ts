import { Appointment } from "../models/appointment.model";
import api from "../configs/axios/http-common";
import { AppointmentFilter, PageableFilter } from "../vo/types/filters";
import { Page } from "../vo/types/types";

const APPOINTMENT_PATH: string = 'appointment';

export const createAppointment = (consultationId: number, notes: string): Promise<Appointment> => {
    return api.post<Appointment>(`${APPOINTMENT_PATH}/appoint/${consultationId}`, {notes})
        .then(response => response.data);
}

export const findAllByPerson = (appointmentFilter: PageableFilter<AppointmentFilter>): Promise<Page<Appointment>> => {
    return api.get<Page<Appointment>>(APPOINTMENT_PATH, { params: appointmentFilter })
        .then(response => response.data);
}

export const findNextByPerson = (): Promise<Appointment[]> => {
    return api.get<Appointment[]>(`${APPOINTMENT_PATH}/next`)
        .then(response => response.data);
}

export const findAppointmentById = (appointmentId: number): Promise<Appointment> => {
    return api.get<Appointment>(`${APPOINTMENT_PATH}/${appointmentId}`)
        .then(response => response.data);
}

export const findScheduledEmergencyByPerson = (): Promise<Appointment> => {
    return api.get<Appointment>(`${APPOINTMENT_PATH}/scheduled-emergency`)
        .then(response => response.data);
}

export const updateAppointment = (appointment: Appointment): Promise<Appointment> => {
    return api.put<Appointment>(APPOINTMENT_PATH, appointment)
        .then(response => response.data);
}

export const cancelAppointment = (appointmentId: number): Promise<Appointment> => {
    return api.put<Appointment>(`${APPOINTMENT_PATH}/cancel/${appointmentId}`)
        .then(response => response.data);
}
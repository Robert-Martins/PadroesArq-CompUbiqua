export type AddressFilter = {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: number;
    longitude: number;
}

export type LocationFilter = {
    name: string;
    acceptsEmergencies: boolean;
} & AddressFilter;

export type ConsultationFilter = {
    responsibleDoctor: string;
    specialty: string;
    startDate: Date;
    endDate: Date;
} & LocationFilter;

export type AppointmentFilter = {
    status: string;
} & ConsultationFilter;

export type PageableFilter<T> = {
    page: number;
    size: number;
    sort: string;
    direction: string;
} & T;
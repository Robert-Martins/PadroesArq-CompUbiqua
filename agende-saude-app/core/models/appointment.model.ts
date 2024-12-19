import { Consultation } from "./consultation.model";
import { Screening } from "./screening.model";

export class Appointment {

    constructor(
        public id: number = null,
        public notes: string = null,
        public status: string = null,
        public consultation: Consultation = null,
        public screening: Screening = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}
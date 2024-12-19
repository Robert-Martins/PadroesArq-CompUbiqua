import { Location } from "./location.model";

export class Consultation {

    constructor(
        public id: number = null,
        public responsibleDoctor: string = null,
        public type: string = null,
        public specialty: string = null,
        public date: Date = null,
        public location: Location = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}
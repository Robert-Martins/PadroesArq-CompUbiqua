import { Allergy } from "./allergy.model";
import { Media } from "./media.model";
import { MedicalHistory } from "./medical-history.model";
import { User } from "./user.model";

export class Person {

    constructor(
        public id: number = null,
        public fullName: string = null,
        public taxId: string = null,
        public birthDate: Date = null,
        public genderType: string = null,
        public bloodType: string = null,
        public allergies: Allergy[] = [],
        public medicalHistories: MedicalHistory[] = [],
        public user: User = null,
        public profilePicture: Media = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}
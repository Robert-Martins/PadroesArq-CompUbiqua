export class MedicalHistory {

    constructor(
        public id: number = null,
        public condition: string = null,
        public details: string = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}
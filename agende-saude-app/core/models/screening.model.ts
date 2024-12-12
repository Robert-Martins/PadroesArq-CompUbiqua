export class Screening {

    constructor(
        public id: number = null,
        public questionnaire: Map<string, boolean> = null,
        public notes: string = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

    public static from(notes: string, questionnaire: Map<string, boolean>): Screening {
        return new Screening(null, questionnaire, notes);
    }

}
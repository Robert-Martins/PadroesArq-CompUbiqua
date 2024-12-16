export interface Question {
    id: number;
    question: string;
    subQuestions?: Question[];
}
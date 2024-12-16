export class Answer {
    id: number;
    question: string;
    answer: boolean;
    subQuestions?: Answer[];
}
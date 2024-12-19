import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class Answer {

    @IsNotEmpty({ message: 'ID da pergunta é obrigatório' })
    @IsNumber({}, { message: 'ID da pergunta deve ser um número' })
    id: number;

    @IsNotEmpty({ message: 'Resposta é obrigatória' })
    @IsBoolean({ message: 'Resposta deve ser um booleano' })
    answer: boolean;

    subQuestionsAnswer?: Answer[];
}
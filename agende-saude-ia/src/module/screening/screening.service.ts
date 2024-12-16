import { Injectable } from "@nestjs/common";
import { Question } from "./dtos/question.dto";
import { SCREENING_QUESTIONS } from "src/core/vo/consts/questions";
import { Answer } from "./dtos/answer.dto";
import { Screening } from "./dtos/screening.dto";

@Injectable()
export class ScreeningService {

    public getQuestions(): Question[] {
        return SCREENING_QUESTIONS;
    }

    public async processAnswers(answers: Answer[]): Promise<Screening> {
        return {
            classification: 'verde',
            description: 'Sem sintomas'
        };
    }

}
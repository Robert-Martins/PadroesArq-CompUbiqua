import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Post } from "@nestjs/common";
import { ScreeningService } from "./screening.service";
import { Question } from "./dtos/question.dto";
import { Answer } from "./dtos/answer.dto";
import { Screening } from "./dtos/screening.dto";
import { AnsweredQuestions } from "./dtos/answered-questions.dto";

@Controller('screening')
export class ScreeningController {

    constructor(
        private readonly screeningService: ScreeningService
    ) { }

    @Get('questions')
    @HttpCode(HttpStatus.OK)
    public getQuestions(): Question[] {
        return this.screeningService.getQuestions();
    }

    @Post('answers')
    @HttpCode(HttpStatus.OK)
    public async processAnswers(@Body() answers: AnsweredQuestions[]): Promise<Screening> {
        return this.screeningService.processAnswers(answers);
    }

}
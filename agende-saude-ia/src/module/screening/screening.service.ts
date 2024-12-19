import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Question } from "./dtos/question.dto";
import { SCREENING_QUESTIONS } from "src/core/vo/consts/questions";
import { Answer } from "./dtos/answer.dto";
import { Screening } from "./dtos/screening.dto";
import { AnsweredQuestions } from "./dtos/answered-questions.dto";
import axios from 'axios';

interface OpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
            refusal: string | null;
        };
        finish_reason: string;
        logprobs: any | null;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    system_fingerprint: string | null;
}

@Injectable()
export class ScreeningService {
    
    constructor(private configService: ConfigService) {}

    private readonly openAiApiKey = this.configService.get<string>('OPENAI_API_KEY');

    public getQuestions(): Question[] {
        return SCREENING_QUESTIONS;
    }

    private async getOpenAIResponse(prompt: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: `Classifique a condição do paciente com base nas seguintes informações:
                            Informações: [${prompt}]
                            A classificação deve ser uma das seguintes: 'verde', 'azul', 'amarelo', 'laranja', 'vermelho'. Nessa ordem, verde seria o mais saudável, e vermelho alguém correndo riscos mais severos de saúde.
                            A resposta deve vir no seguinte formato:
                            {"classification": 'verde | azul | amarelo | laranja | vermelho', "description": 'breve descrição dos sintomas do paciente e por que a classificação foi feita'}`
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.openAiApiKey}`
                    }
                }
            );

            const content = (response.data as OpenAIResponse).choices[0].message.content.trim();
            
            const validJsonString = content.replace(/(\r\n|\n|\r)/gm, "").replace(/'/g, '"');
            return JSON.parse(validJsonString);

        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
            throw new Error('Failed to process screening');
        }
    }

    public async processAnswers(answeredQuestions: AnsweredQuestions): Promise<Screening> {

        if (!answeredQuestions || !answeredQuestions.answers) {
            throw new Error('Invalid answers structure provided');
        }

        const questionList: string[] = [];
        const answerList: boolean[] = [];

        function formatQAList(
            questions: Question[],
            answers: Answer[]
        ) {
            questions.forEach(question => {
                const matchingAnswer = answers.find(a => a.id === question.id);

                if (matchingAnswer) {
                    questionList.push(question.question);
                    answerList.push(matchingAnswer.answer);
                }

                if (question.subQuestions && matchingAnswer?.subQuestionsAnswer) {
                    formatQAList(
                        question.subQuestions,
                        matchingAnswer.subQuestionsAnswer
                    );
                }
            });
        }

        formatQAList(this.getQuestions(), answeredQuestions.answers);

        const prompt = questionList
            .map((q, i) => `${q} ${answerList[i]}`)
            .join('\n');

        const aiResponse = await this.getOpenAIResponse(prompt);

        return {
            classification: aiResponse.classification,
            description: aiResponse.description,
        };
    }

}
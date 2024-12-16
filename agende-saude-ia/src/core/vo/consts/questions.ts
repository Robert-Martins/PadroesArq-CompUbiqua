import { Question } from "src/module/screening/dtos/question.dto";

export const SCREENING_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "Você é do sexo feminino?"
    },
    {
        id: 2,
        question: "Você tem mais de 60 anos?"
    },
    {
        id: 3,
        question: "Você sofreu alguma lesão?",
        subQuestions: [
            {
                id: 4,
                question: "A lesão é exposta?"
            },
            {
                id: 5,
                question: "Há sangramento na área da lesão?"
            },
            {
                id: 6,
                question: "A lesão impede o movimento de algum membro?"
            }
        ]
    },
    {
        id: 7,
        question: "Você está apresentando sintomas de tosse?",
        subQuestions: [
            {
                id: 8,
                question: "A tosse é seca?"
            },
            {
                id: 9,
                question: "A tosse é produtiva (com secreção)?"
            },
            {
                id: 10,
                question: "A tosse está acompanhada de sangue?"
            }
        ]
    },
    {
        id: 11,
        question: "Você está apresentando febre?",
        subQuestions: [
            {
                id: 12,
                question: "A febre dura mais de 48 horas?"
            },
            {
                id: 13,
                question: "Você sente calafrios junto com a febre?"
            }
        ]
    },
    {
        id: 14,
        question: "Você está com falta de ar?",
        subQuestions: [
            {
                id: 15,
                question: "A falta de ar ocorre mesmo em repouso?"
            },
            {
                id: 16,
                question: "A falta de ar piora ao se movimentar?"
            }
        ]
    },
    {
        id: 17,
        question: "Você está sentindo dor?",
        subQuestions: [
            {
                id: 18,
                question: "A dor é no peito?"
            },
            {
                id: 19,
                question: "A dor dificulta suas atividades diárias?"
            }
        ]
    },
    {
        id: 20,
        question: "Você sente tontura ou dificuldade para se manter de pé?"
    },
    {
        id: 21,
        question: "Você está apresentando vômitos?",
        subQuestions: [
            {
                id: 22,
                question: "Os vômitos persistem há mais de 24 horas?"
            },
            {
                id: 23,
                question: "Os vômitos estão acompanhados de náuseas intensas?"
            }
        ]
    },
    {
        id: 24,
        question: "Você está apresentando diarreia?",
        subQuestions: [
            {
                id: 25,
                question: "A diarreia persiste há mais de 24 horas?"
            },
            {
                id: 26,
                question: "A diarreia está acompanhada de sangue?"
            }
        ]
    },
    {
        id: 27,
        question: "Você tem enxaquecas frequentes?",
        subQuestions: [
            {
                id: 28,
                question: "A enxaqueca é acompanhada de sensibilidade à luz?"
            },
            {
                id: 29,
                question: "A enxaqueca é acompanhada de náuseas?"
            }
        ]
    },
    {
        id: 30,
        question: "Você sente sinais de desidratação?",
        subQuestions: [
            {
                id: 31,
                question: "Sua boca ou lábios estão secos?"
            },
            {
                id: 32,
                question: "Você sente muita sede?"
            },
            {
                id: 33,
                question: "Você percebe redução na frequência de urina?"
            }
        ]
    }
  ];
  
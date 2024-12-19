export type Enum = {
    name: string;
    description: string;
}

export type ApplicationError = {
    error: any | AgendeSaudeApplicationError;
}

export type AgendeSaudeApplicationError = {
    title: string;
    status: number;
    details: string;
    developerMessage: string;
    className: string;
    timestamp: Date;
}

export type AuthenticationRequest = {
    taxId: string;
    password: string;
}

export type AuthenticationResponse = {
    accessToken: string;
    refreshToken: string;
}

export type PasswordReset = {
    hash: string;
    email: string;
    newPassword: string;
}

export type Token = {
    token: string;
    hash: string;
    type: string;
}

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export type CepRequestResponse = {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
}

export type Location = {
    coords: {
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        latitude: number;
        longitude: number;
        speed: number;
    };
    mocked: boolean;
    provider: string;
    timestamp: number;
}

export type ScreeningQuestionnaire = {
    id: number;
    question: string;
    subQuestions: ScreeningQuestionnaire[];
}

export type ScreeningQuestionnaireAnswer = {
    id: number;
    question?: string;
    answer: boolean;
    subQuestionsAnswer?: ScreeningQuestionnaireAnswer[];
}
  
export type DisplayModalArguments<T> = {
    modal: (props: T) => React.ReactNode;
    header?: string;
    showCloseButton?: boolean;
    modalProps?: T;
};
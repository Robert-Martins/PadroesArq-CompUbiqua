export type ApplicationInfo = {
    title: string;
    description: string;
    version: string;
    startedAt: Date;
}

export type ScreeningClassification = 'vermelho' | 'laranja' | 'amarelo' | 'verde' | 'azul';
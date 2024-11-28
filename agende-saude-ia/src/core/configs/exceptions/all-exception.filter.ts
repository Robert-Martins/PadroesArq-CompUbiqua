import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost
    ) { }

    public catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const response: ExceptionResponse = ExceptionResponse.from(exception);

        httpAdapter.reply(ctx.getResponse(), response, response.status);
    }

}

class ExceptionResponse {

    public exception: string;
    public status: number;
    public message: string;
    public timestamp: string;

    constructor() {
        this.timestamp = new Date().toISOString();
    }

    public static from(exception: unknown): ExceptionResponse {
        return exception instanceof HttpException
            ? ExceptionResponse.fromHttpException(exception)
            : ExceptionResponse.fromUnknown(exception);
    }

    private static fromHttpException(exception: HttpException): ExceptionResponse {
        const exceptionResponse: ExceptionResponse = new ExceptionResponse();
        exceptionResponse.exception = exception.name;
        exceptionResponse.status = exception.getStatus();
        exceptionResponse.message = exception.message;
        return exceptionResponse;
    }

    private static fromUnknown(exception: any): ExceptionResponse {
        const exceptionResponse: ExceptionResponse = new ExceptionResponse();
        exceptionResponse.exception = exception?.name ?? 'Internal Server Error';
        exceptionResponse.status = exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        exceptionResponse.message = exception?.message ?? 'Erro ao processar requisição';
        return exceptionResponse;
    }

}
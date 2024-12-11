import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Optional } from "src/core/utils/optional";

@Injectable()
export class AuthGuard implements CanActivate {

    private readonly X_API_KEY: string = "x-api-key";

    private readonly API_KEY_NOT_SENDED: string = "A chave de API não foi enviada";

    private readonly API_KEY_INVALID: string = "A chave de API é inválida";

    constructor(
        private readonly configService: ConfigService
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        this.performAuthValidation(context);
        return true;
    }

    private performAuthValidation(context: ExecutionContext): void {
        Optional.ofNullable(this.extractFromHeader(context.switchToHttp().getRequest()))
            .filter(value => value === this.configService.get<string>("api.key"))
            .orElseThrow(() => new ForbiddenException(this.API_KEY_INVALID))
    }

    private extractFromHeader(request: Request): string {
        return Optional.ofNullable(request.headers[this.X_API_KEY])
            .orElseThrow(() => new ForbiddenException(this.API_KEY_NOT_SENDED));
    }

}
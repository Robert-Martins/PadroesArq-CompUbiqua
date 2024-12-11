import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ClassSerializerInterceptor, ExceptionFilter, INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/configs/exceptions/all-exception.filter';
import { corsOptions } from './core/configs/security/security.providers';
import { useContainer, ValidationError } from 'class-validator';

const extractErrorMessages = (errors: ValidationError[]): string[] => {
  const messages: string[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      messages.push(...extractErrorMessages(error.children));
    }
  });

  return messages;
};

const configAppPipes = (): ValidationPipe[] => {
  return [
    new ValidationPipe({
      transform: true,
      exceptionFactory: async (errors: ValidationError[]) => {
        const errorMessages = extractErrorMessages(errors);
        return new BadRequestException(errorMessages.toString());
      },
    })
  ];
}

const configAppFilters = (app: INestApplication): ExceptionFilter[] => {
  return [
    new AllExceptionsFilter(
      app.get(HttpAdapterHost)
    )
  ];
}

const configAppInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

const configApp = (app: INestApplication): void => {
  app.useGlobalPipes(...configAppPipes());
  app.useGlobalFilters(...configAppFilters(app));
  configAppInterceptors(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

const bootstrap =  async () => {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  configApp(app);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();


import { NestFactory } from '@nestjs/core';
import { ValidationPipe, 
          ValidationError, 
          BadRequestException
        } from '@nestjs/common';
import { AppModule} from './app.module';
// import  HttpExceptionFilter  from '../src/helpers/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

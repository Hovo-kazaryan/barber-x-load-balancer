import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class MicroserviceExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      typeof exception?.statusCode === 'number'
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === HttpStatus.UNPROCESSABLE_ENTITY) {
      return response.status(422).json({
        message: 'Unprocessable entity',
        fields: exception.fields || {},
      });
    }

    if (
      statusCode === HttpStatus.BAD_REQUEST ||
      statusCode === HttpStatus.NOT_FOUND
    ) {
      return response.status(statusCode).json({
        message:
          typeof exception.message === 'string'
            ? exception.message
            : exception?.response?.message || 'Bad request',
      });
    }

    return response.status(statusCode).json({
      statusCode,
      message: exception?.message || 'Internal server error',
    });
  }
}

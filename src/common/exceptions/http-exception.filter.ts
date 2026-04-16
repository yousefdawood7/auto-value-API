// import { STATUS_CODES } from "http";

// {
//     status: "success",
//     statusCode: 200,
//     data: {},
//     message?: 'asd'
//     details: {}// errors only
//     data: {} // only for success
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as object;

    response.status(status).json({
      status: status < 500 ? 'fail' : 'error',
      statusCode: status,
      ...exceptionResponse,
    });
  }
}

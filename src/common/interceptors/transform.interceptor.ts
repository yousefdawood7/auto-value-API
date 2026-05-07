import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: { [key: string]: unknown }) => {
        if (typeof data === 'string')
          return { status: 'success', message: data };

        const { message, ...serializedData } = data;

        return {
          status: 'success',
          ...((message as string) && { message }),

          ...(Object.keys(serializedData).length && {
            details: {
              ...serializedData,
            },
          }),
        };
      }),
    );
  }
}

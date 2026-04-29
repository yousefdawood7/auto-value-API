import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(({ id, ...user }: User) => ({
        status: 'success',
        id,
        details: {
          ...user,
        },
      })),
    );
  }
}

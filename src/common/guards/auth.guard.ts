import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { ERROR_CONFIG } from '../configs/error.config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session } = context.switchToHttp().getRequest<
      Request & {
        session: {
          user?: {
            email?: string;
          };
        };
      }
    >();

    const email = session.user?.email;
    if (!email) {
      throw new UnauthorizedException({
        ...ERROR_CONFIG.AUTHENTICATION_ERROR,
        message: 'You are not currently signed in',
      });
    }

    const user = await this.userService.findUserByEmail(email);

    if (!user)
      throw new UnauthorizedException(ERROR_CONFIG.AUTHENTICATION_ERROR);

    return true;
  }
}

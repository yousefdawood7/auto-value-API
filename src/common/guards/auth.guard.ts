import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { SignInUserDto } from '../../user/dto/signin-user.dto';
import { ERROR_CONFIG } from '../configs/error.config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context
      .switchToHttp()
      .getRequest<Request<unknown, unknown, SignInUserDto>>();

    // prettier-ignore
    if (!body.email)
      throw new BadRequestException();

    const user = await this.userService.findUserByEmail(body.email);

    // prettier-ignore
    if (!user)
      throw new NotFoundException(ERROR_CONFIG.AUTHENTICATION_ERROR);

    return true;
  }
}

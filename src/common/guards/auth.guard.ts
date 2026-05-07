import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import type { Repository } from 'typeorm';
import type { Request } from 'express';
import { SignInUserDto } from '../../user/dto/signin-user.dto';
import { ERROR_CONFIG } from '../configs/error.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context
      .switchToHttp()
      .getRequest<Request<unknown, unknown, SignInUserDto>>();

    // prettier-ignore
    if (!body.email)
      throw new BadRequestException();

    const user = await this.repo.findOne({
      where: {
        email: body.email,
      },
    });

    // prettier-ignore
    if (!user)
      throw new NotFoundException(ERROR_CONFIG.AUTHENTICATION_ERROR);

    return true;
  }
}

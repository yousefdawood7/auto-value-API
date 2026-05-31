import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { randomBytes } from 'crypto';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { hashPassword } from '../common/utils/hash-password';
import { ERROR_CONFIG } from '../common/configs/error.config';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(body: CreateUserDto, session: Record<string, unknown>) {
    const salt = randomBytes(8).toString('hex');

    const hashedSaltedPassword =
      salt + '.' + (await hashPassword(body.password, salt));

    const user = await this.userService.createUser({
      ...body,
      password: hashedSaltedPassword,
    });

    session.user = instanceToPlain(plainToInstance(UserDto, user));

    return user;
  }

  async signin(body: SignInUserDto, session: Record<string, unknown>) {
    const user = await this.userService.findUserByEmail(body.email);
    const [userSalt, userPassword] = user?.password.split('.') as [
      string,
      string,
    ];

    const signedInPassword = await hashPassword(body.password, userSalt);

    if (signedInPassword !== userPassword)
      throw new UnauthorizedException(ERROR_CONFIG.AUTHENTICATION_ERROR);

    session.user = instanceToPlain(plainToInstance(UserDto, user));

    return {
      message: 'user signed in successfully',
      ...user,
    };
  }

  async signout(session: Partial<{ user: { email?: string } }>) {
    const email = session?.user?.email;

    // prettier-ignore
    if (!session.user || !email)
      throw new BadRequestException({ message: 'User not found' });

    const user = await this.userService.findUserByEmail(email);

    // prettier-ignore
    if (!user)
      throw new BadRequestException({ message: 'User not found' });

    // log user out (by deleting session)
    session.user = {};

    return 'user logged out successfully';
  }
}

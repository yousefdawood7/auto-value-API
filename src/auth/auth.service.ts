import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { randomBytes } from 'crypto';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { hashPassword } from '../common/utils/hashPassword';
import { ERROR_CONFIG } from '../common/configs/error.config';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(body: CreateUserDto) {
    const salt = randomBytes(8).toString('hex');

    const hashedSaltedPassword =
      salt + '.' + (await hashPassword(body.password, salt));

    return this.userService.createUser({
      ...body,
      password: hashedSaltedPassword,
    });
  }

  async signin(body: SignInUserDto) {
    const user = await this.userService.findUserByEmail(body.email);
    const [userSalt, userPassword] = user?.password.split('.') as [
      string,
      string,
    ];

    const signedInPassword = await hashPassword(body.password, userSalt);

    if (signedInPassword !== userPassword)
      throw new NotFoundException(ERROR_CONFIG.AUTHENTICATION_ERROR);

    return {
      message: 'user signed in successfully',
      ...plainToInstance(UserDto, user),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(body: CreateUserDto) {
    const salt = randomBytes(8).toString('hex');
    const scrypt = promisify(_scrypt);
    console.log(body.password);
    const hashedSaltedPassword =
      ((await scrypt(body.password, salt, 32)) as Buffer).toString('hex') +
      '.' +
      salt;

    console.log(salt);
    console.log(hashedSaltedPassword);

    return this.userService.createUser({
      ...body,
      password: hashedSaltedPassword,
    });
  }
}

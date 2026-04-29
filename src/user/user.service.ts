import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(body: CreateUserDto) {
    const user = this.repo.create({
      email: body.email,
      name: { first: body.firstName, last: body.lastName },
      password: body.password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (({ password, ...user }) => user)(await this.repo.save(user));
  }
}

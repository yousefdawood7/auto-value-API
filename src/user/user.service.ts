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
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    });

    return this.repo.save(user);
  }

  findUserByEmail(email: string) {
    const user = this.repo.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  findUserById(id: number) {
    const user = this.repo.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

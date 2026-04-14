import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { SchemaService } from '../common/schema/schema.service';
import { userSchema } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private schemaService: SchemaService,
  ) {
    this.schemaService.register('CreateUserDto', userSchema);
  }
}

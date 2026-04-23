import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createUserSchema } from '../user/schemas/create-user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ZodSchema(createUserSchema)
  @Post('signup')
  createUser(@Body() { firstName, lastName, password }: CreateUserDto) {}
}

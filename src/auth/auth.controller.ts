import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createUserSchema } from '../user/schemas/create-user.schema';
import { UserService } from '../user/user.service';
import { Serialize } from '../common/decorators/serialize.decorator';
import { signInUserSchema } from '../user/schemas/signin-user.schema';
import { SignInUserDto } from '../user/dto/signin-user.dto';

@Controller('auth')
@Serialize(CreateUserDto)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ZodSchema(createUserSchema)
  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @ZodSchema(signInUserSchema)
  @Post('signin')
  signIn(@Body() body: SignInUserDto) {}
}

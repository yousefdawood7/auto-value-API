import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createUserSchema } from '../user/schemas/create-user.schema';
import { Serialize } from '../common/decorators/serialize.decorator';
import { signInUserSchema } from '../user/schemas/signin-user.schema';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { SignInGuard } from '../common/guards/signin.guard';
import { SignUpGuard } from '../common/guards/signup.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ZodSchema(createUserSchema)
  @UseGuards(SignUpGuard)
  @Post('signup')
  signUp(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, unknown>,
  ) {
    return this.authService.signup(body, session);
  }

  @ZodSchema(signInUserSchema)
  @Post('signin')
  @UseGuards(SignInGuard)
  signIn(
    @Body(ZodValidationPipe) body: SignInUserDto,
    @Session() session: Record<string, unknown>,
  ) {
    return this.authService.signin(body, session);
  }

  @Post('signout')
  signOut(@Session() session: Partial<{ user: { email?: string } }>) {
    return this.authService.signout(session);
  }
}

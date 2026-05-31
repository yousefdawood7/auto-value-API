import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createUserSchema } from '../user/schemas/create-user.schema';
import { Serialize } from '../common/decorators/serialize.decorator';
import { signInUserSchema } from '../user/schemas/signin-user.schema';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { SignInGuard } from '../common/guards/signin.guard';
import { SignUpGuard } from '../common/guards/signup.guard';
import { UserDto } from '../user/dto/user.dto';
import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from '../common/dto/error-response.dto';
import { UserSuccessResponseDto } from '../user/dto/user-success-response.dto';
import { MessageSuccessResponseDto } from '../common/dto/message-success-response.dto';

@Controller('auth')
@ApiTags('Authentication')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ZodSchema(createUserSchema)
  @UseGuards(SignUpGuard)
  @Post('signup')
  @ApiOperation({
    summary: 'Register a new account',
    description:
      'Creates a user account, persists a salted password hash, and starts an authenticated session by returning the signed session cookies.',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateUserDto,
    description: 'Payload required to create a new user account.',
    examples: {
      default: {
        summary: 'Standard account registration payload',
        value: {
          email: 'john.doe@autovalue.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description:
      'The account was created successfully and the session cookies were issued.',
    type: UserSuccessResponseDto,
    schema: {
      example: {
        status: 'success',
        details: {
          id: 17,
          email: 'john.doe@autovalue.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The request body failed schema validation.',
    type: ValidationErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 400,
        message: 'Validation failed',
        details: {
          fieldErrors: {
            password: 'Password must be at least 8 characters',
          },
        },
      },
    },
  })
  @ApiConflictResponse({
    description: 'The email address is already registered.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 409,
        message: 'Email is already exists',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'The server failed to process the registration request.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
      },
    },
  })
  signUp(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, unknown>,
  ) {
    return this.authService.signup(body, session);
  }

  @ZodSchema(signInUserSchema)
  @UseGuards(SignInGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({
    summary: 'Authenticate an existing user',
    description:
      'Validates the provided credentials, stores the authenticated user in the signed session cookie, and returns the public user profile.',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: SignInUserDto,
    description: 'Credentials for an existing user account.',
    examples: {
      default: {
        summary: 'Email and password login payload',
        value: {
          email: 'john.doe@autovalue.com',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'The user was authenticated and the session was refreshed.',
    type: UserSuccessResponseDto,
    schema: {
      example: {
        status: 'success',
        message: 'user signed in successfully',
        details: {
          id: 17,
          email: 'john.doe@autovalue.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The signin payload failed schema validation.',
    type: ValidationErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 400,
        message: 'Validation failed',
        details: {
          fieldErrors: {
            email: 'Invalid email address',
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The supplied email or password was invalid.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 401,
        message: 'Email or password is incorrect',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'The server failed to process the signin request.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
      },
    },
  })
  signIn(
    @Body() body: SignInUserDto,
    @Session() session: Record<string, unknown>,
  ) {
    return this.authService.signin(body, session);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  @ApiOperation({
    summary: 'End the current session',
    description:
      'Clears the authenticated session for the current signed-in user. The request succeeds only when a valid session already exists.',
  })
  @ApiOkResponse({
    description: 'The authenticated session was cleared successfully.',
    type: MessageSuccessResponseDto,
    schema: {
      example: {
        status: 'success',
        message: 'user logged out successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'The request was sent without an active session or the session user no longer exists.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 400,
        message: 'User not found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'The server failed to process the signout request.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
      },
    },
  })
  signOut(@Session() session: Partial<{ user: { email?: string } }>) {
    return this.authService.signout(session);
  }
}

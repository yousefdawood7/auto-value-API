import { it, beforeEach, describe, jest, expect } from '@jest/globals';

import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

describe('AuthController', () => {
  let authController: AuthController;

  const mockUserService = {
    createUser: jest.fn<(body: CreateUserDto) => Promise<User>>(),
    findUserByEmail: jest.fn<(email: string) => Promise<User>>(),
  };

  const mockAuthService = {
    signup:
      jest.fn<
        (body: CreateUserDto, session: Record<string, unknown>) => Promise<User>
      >(),
    signin:
      jest.fn<
        (
          body: SignInUserDto,
          session: Record<string, unknown>,
        ) => Promise<Partial<User> & { message: string }>
      >(),
    signout:
      jest.fn<
        (
          session: Partial<{ user: { email?: string | undefined } }>,
        ) => Promise<string>
      >(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authController = module.get(AuthController);
  });

  it('should signin the controller successfully', async () => {
    const mockSession = {};
    const mockUserBody: SignInUserDto = {
      email: 'email@example.com',
      password: 'Test123123Test',
    };

    mockAuthService.signin.mockResolvedValue({
      message: 'user signed in successfully',
      email: mockUserBody.email,
    });

    const user = await authController.signIn(mockUserBody, mockSession);

    expect(mockAuthService.signin).toBeDefined();
    expect(mockAuthService.signin).toHaveBeenCalledWith(
      { ...mockUserBody },
      mockSession,
    );

    expect(user.email).toBe(mockUserBody.email);
  });
});

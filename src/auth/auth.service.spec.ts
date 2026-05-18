import { Test } from '@nestjs/testing';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_CONFIG } from '../common/configs/error.config';
import { hashPassword } from '../common/utils/hashPassword';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUserService = {
    createUser: jest.fn<(body: CreateUserDto) => Promise<unknown>>(),
    findUserByEmail: jest.fn<(email: string) => Promise<unknown>>(),
  };

  const mockedBody: CreateUserDto = {
    email: 'email@example.com',
    firstName: 'foo',
    lastName: 'bar',
    password: 'TEST123123123TEST',
  };

  const mockSession = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should signup the user successfully', async () => {
    mockUserService.createUser.mockResolvedValue({
      id: 1,
      ...mockedBody,
      password: 'hashed-password',
    });
    const signedInUser = await authService.signup(mockedBody, mockSession);

    expect(mockUserService.createUser).toHaveBeenCalled();

    expect(mockUserService.createUser).toHaveBeenCalledWith({
      ...mockedBody,
      password: expect.any(String),
    });

    expect(mockSession).toEqual({
      user: {
        email: mockedBody.email,
        firstName: mockedBody.firstName,
        lastName: mockedBody.lastName,
        fullName: mockedBody.firstName + ' ' + mockedBody.lastName,
      },
    });

    expect(signedInUser).toEqual({
      id: 1,
      ...mockedBody,
      password: 'hashed-password',
    });
  });

  it('should signin the user successfully', async () => {
    mockUserService.findUserByEmail.mockResolvedValue({
      id: 1,
      ...mockedBody,
      password: `SALT.${await hashPassword(mockedBody.password, 'SALT')}`,
    });

    const signedInUser = await authService.signin(
      { email: mockedBody.email, password: mockedBody.password },
      mockSession,
    );

    expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
      mockedBody.email,
    );

    expect(mockSession).toEqual({
      user: {
        id: 1,
        email: mockedBody.email,
        firstName: mockedBody.firstName,
        lastName: mockedBody.lastName,
        fullName: mockedBody.firstName + ' ' + mockedBody.lastName,
      },
    });

    expect(signedInUser).toEqual({
      message: 'user signed in successfully',
      id: 1,
      ...mockedBody,
      password: `SALT.${await hashPassword(mockedBody.password, 'SALT')}`,
    });
  });

  it('should signin the user unsuccessfully', async () => {
    mockUserService.findUserByEmail.mockResolvedValue({
      id: 1,
      email: mockedBody.email,
      password: 'SALT.HASHED_PASSWORD',
    });
    const signedInUser = authService.signin(
      {
        email: mockedBody.email,
        password: mockedBody.password,
      },
      mockSession,
    );

    expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
      mockedBody.email,
    );
    await expect(signedInUser).rejects.toThrow(
      new UnauthorizedException(ERROR_CONFIG.AUTHENTICATION_ERROR),
    );
  });

  it('should signout the user successfully', async () => {
    const mockedSignedOutSession = {
      user: {
        email: mockedBody.email,
      },
    };

    mockUserService.findUserByEmail.mockResolvedValue({
      id: 1,
      ...mockedBody,
      password: `SALT.${await hashPassword(mockedBody.password, 'SALT')}`,
    });

    const loggedOutUser = await authService.signout(mockedSignedOutSession);

    expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
      mockedBody.email,
    );

    expect(mockedSignedOutSession).toEqual({ user: {} });

    expect(loggedOutUser).toBe('user logged out successfully');
  });
});

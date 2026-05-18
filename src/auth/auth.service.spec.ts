import { Test } from '@nestjs/testing';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUserService = {
    createUser: jest.fn<(body: CreateUserDto) => Promise<unknown>>(),
  };

  const mockedBody: CreateUserDto = {
    email: 'email@example.com',
    firstName: 'foo',
    lastName: 'bar',
    password: 'TEST123123123TEST',
  };

  const mockSession = {};

  mockUserService.createUser.mockResolvedValue({
    id: 1,
    ...mockedBody,
    password: 'hashed-password',
  });

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
});

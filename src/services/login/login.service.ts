import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, AUTH_SERVICE } from 'src/constants';
import { NotFoundException, UnauthorizedException } from 'core/exceptions';
import { ILoginService, IParams, IResponse } from 'domain/use-cases/login';
import { IUserRepository } from 'domain/use-cases/user';
import { IAuthService } from 'domain/use-cases/auth';
import { UserNotFoundException } from 'domain/user';
import { IncorrectPasswordException } from 'domain/user/value-objects';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepository,
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  async execute(params: IParams): Promise<IResponse> {
    const user = await this.userRepo.findByEmail(params.email);
    if (!user) throw new UserNotFoundException();

    const isValidPassword = await user.comparePassword(params.password);
    if (!isValidPassword) throw new IncorrectPasswordException();

    const accessToken = await this.authService.signInJWT(user);
    return { accessToken };
  }
}

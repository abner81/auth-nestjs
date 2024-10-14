import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, AUTH_SERVICE } from 'src/constants';
import { NotFoundException, UnauthorizedException } from 'core/exceptions';
import { AccessToken } from 'domain/shared/value-objects';
import { ILoginService, IParams, IResponse } from 'domain/use-cases/login';
import { IUserRepository } from 'domain/use-cases/user';
import { IAuthService } from 'domain/use-cases/auth';

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
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const isValidPassword = await user.comparePassword(params.password);
    if (!isValidPassword) throw new UnauthorizedException('Senha inválida.');

    const accessToken = await this.authService.signInJWT(user);
    return { accessToken };
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { LOGIN_SERVICE } from '../../constants';
import { Response } from 'express';
import { LoginDTO } from './login.DTO';
import { Email, Password } from 'domain/user/value-objects';
import { ILoginService } from 'domain/use-cases/login';
import { ParseControllerError } from 'core/util/controller/parse-controller-error';

@Controller('/login')
export class LoginController {
  constructor(
    @Inject(LOGIN_SERVICE) private readonly loginService: ILoginService,
  ) {}

  @Post()
  async create(@Body() dto: LoginDTO, @Res() res: Response) {
    try {
      console.log(dto);

      const email = new Email({ email: dto.email });
      const password = new Password({ password: dto.password });
      const { accessToken } = await this.loginService.execute({
        email,
        password,
      });

      return res.status(HttpStatus.OK).json(accessToken.export());
    } catch (error) {
      return ParseControllerError(error, res);
    }
  }
}

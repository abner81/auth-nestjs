import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { User } from 'domain/user';
import { CreateUserDTO } from './user.DTO';
import { IUserService } from 'domain/use-cases/user';
import { USER_SERVICE } from '../../constants';
import { NotFoundException, OperationConflictException } from 'core/exceptions';
import { Response } from 'express';
import { DomainException } from 'core/domain/exceptions';
import { ParseControllerError } from 'core/util/controller/parse-controller-error';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDTO, @Res() res: Response) {
    try {
      const user = User.create(dto);
      console.log(dto);
      console.log(user);

      await this.userService.create(user);
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      console.log(error);
      return ParseControllerError(error, res);
    }
  }
}

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
import { CreateUserDTO } from './userDTO';
import { IUserService } from 'domain/use-cases/user';
import { USER_SERVICE } from '../../constants';
import {
  ImplementationException,
  InternalException,
  NotFoundException,
  OperationConflictException,
} from 'core/exceptions';
import { Response } from 'express';
import { DomainException } from 'core/domain/exceptions';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDTO, @Res() res: Response) {
    try {
      const user = User.create(dto);
      await this.userService.create(user);
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof OperationConflictException)
        return res.status(HttpStatus.CONFLICT).json(error.message);

      if (error instanceof NotFoundException)
        return res.status(HttpStatus.NOT_FOUND).json(error.message);

      if (error instanceof DomainException)
        return res.status(HttpStatus.BAD_REQUEST).json(error.message);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}

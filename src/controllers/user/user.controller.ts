import { Body, Controller, Post } from '@nestjs/common';
import { User, UserProps } from 'domain/user';
import { UserService } from 'services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: fazer guard, colocar "validator" no projeto, criar value objects globais ID, CREATEDAT

  @Post()
  async create(@Body() userProps: UserProps) {
    const user = User.create(userProps);

    return;
    // return await this.userService.create(user);
  }
}

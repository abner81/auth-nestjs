import { Body, Controller, Post } from '@nestjs/common';
import { User, UserProps } from 'domain/user.domain';
import { UserService } from 'services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userProps: UserProps) {
    const user = new User({ ...userProps, createdAt: new Date() });

    return await this.userService.create(user);
  }
}

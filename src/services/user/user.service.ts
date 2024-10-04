import { Injectable } from '@nestjs/common';
import { User } from 'domain/user.domain';

@Injectable()
export class UserService {
  async create(user: User) {
    return user;
  }
}

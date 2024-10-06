import { Injectable } from '@nestjs/common';
import { User } from 'domain/user';

@Injectable()
export class UserService {
  async create(user: User) {
    return user;
  }
}

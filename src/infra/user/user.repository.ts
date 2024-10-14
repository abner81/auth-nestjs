import { EntityId } from 'domain/shared/value-objects';
import { User } from 'domain/user';
import { Email } from 'domain/user/value-objects';
import { IUserRepository } from 'domain/use-cases/user/i-user-repository';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async exists(email: Email): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: email.value } });
    return !!user;
  }

  async create(_user: User): Promise<void> {
    const newUser = this.userRepo.create(_user.export());
    await this.userRepo.save(newUser);
  }

  async findByEmail(email: Email): Promise<User> {
    const rawUser = await this.userRepo.findOne({
      where: { email: email.value },
    });
    return rawUser ? new User({ id: rawUser.id, ...rawUser }) : null;
  }
}

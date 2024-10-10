import { User } from 'domain/user';

export const userMock = User.create({
  email: 'johndoe@gmail.com',
  name: 'john doe',
  password: 'my_password',
});

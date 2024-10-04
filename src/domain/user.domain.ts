export type UserProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;

  constructor(props: UserProps) {
    const { createdAt, email, firstName, lastName, password } = props;

    this.email = email;
    this.createdAt = createdAt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

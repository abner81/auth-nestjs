import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  createdAt: Date;
}

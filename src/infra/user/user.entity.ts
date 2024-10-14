import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({
    primary: true,
    type: 'uuid',
    unique: true,
    generated: false,
  })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  createdAt: Date;
}

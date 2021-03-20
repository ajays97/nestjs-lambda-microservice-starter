import {
  Entity,
  ObjectIdColumn,
  Column,
  PrimaryColumn,
  Generated,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { uuidv4 } from '../../../utils/uuid';
import { Exclude, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class User {
  @ApiProperty({ description: 'The _id of the User' })
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  // basic

  @ApiProperty({ description: 'The name of the User' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The email of the User' })
  @Column({
    unique: true
  })
  email: string;

  @ApiProperty({ description: 'The password of the User' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ description: 'The referralCode of the User' })
  @Column()
  referralCode: string;

  // @Column()
  // countryCode: string; // Vietname +84
  // @Column()
  // phone: string; // 0704498756
  // @Column()
  // verified: boolean; // false
  // @Column()
  // authyId: string; // null

  @ApiProperty({ description: 'The avatar of the User' })
  @Column({
    nullable: true
  })
  avatar: string;

  @ApiProperty({ description: 'The phone of the User' })
  @Column({
    nullable: true
  })
  phone: string;

  @ApiProperty({ description: 'The verified of the User' })
  @Column({
    nullable: true
  })
  verified: boolean;

  @ApiProperty({ description: 'The createdAt of the User' })
  @Column()
  @CreateDateColumn()
  createdAt: number;

  @ApiProperty({ description: 'The updatedAt of the User' })
  @Column()
  @UpdateDateColumn()
  updatedAt: number;

  constructor(partial: Partial<User>) {
    // if (partial) {
    //   Object.assign(this, partial);
    //   this._id = this._id || uuidv4();
    //   this.avatar =
    //     this.avatar ||
    //     'https://res.cloudinary.com/chnirt/image/upload/v1573662028/rest/2019-11-13T16:20:22.699Z.png';
    //   this.verified = this.verified || false;
    //   this.createdAt = this.createdAt || +new Date();
    //   this.updatedAt = +new Date();
    // }
  }
}

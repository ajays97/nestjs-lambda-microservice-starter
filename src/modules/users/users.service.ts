import {
  Injectable,
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepository } from 'typeorm';
import * as speakeasy from 'speakeasy';
import { Validator } from 'class-validator';

import { User } from './entities/user.entity';
import { hashPassword } from '../../utils/password';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReplaceUserDto } from './dto/replace-user.dto';

import { uploadFile } from '../../shared/upload';

import { SPEAKEASY_SECRET, SPEAKEASY_STEP } from '../../environments';
import { OtpResponseDto } from './dto/otp-response.dto';

const validator = new Validator();

@Injectable()
export class UsersService {
  async insert(createUserDto: CreateUserDto): Promise<User | undefined> {
    const { email } = createUserDto;

    const existedUser = await getRepository(User).findOne({ email });

    if (existedUser) {
      throw new ForbiddenException('Email already exists.');
    }

    const newUser = {
      ...createUserDto,
      password: await hashPassword(createUserDto.password)
    };

    const newCreatedUser = await getRepository(User).save(newUser);

    return newCreatedUser;
  }

  async findAll(): Promise<User[] | undefined> {
    // return getRepository(UserEntity).find()
    return [];
  }

  async findOne(_id: string): Promise<User | undefined> {
    const foundUser = await getRepository(User).findOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return foundUser;
  }

  async findOneAndReplace(
    _id: string,
    replaceUserDto: ReplaceUserDto
  ): Promise<User | undefined> {
    const foundUser = await getRepository(User).findOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const updateUser = await getRepository(User).save(
      new User({
        ...foundUser,
        ...replaceUserDto
      })
    );

    return updateUser;
  }

  async findOneAndUpdate(
    _id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User | undefined> {
    const foundUser = await getRepository(User).findOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const updateUser = await getRepository(User).save(
      new User({
        ...foundUser,
        ...updateUserDto
      })
    );

    return updateUser;
  }

  async deleteOne(_id: string): Promise<boolean | undefined> {
    const foundUser = await getRepository(User).findOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return (await getRepository(User).delete(foundUser)) ? true : false;
  }

  async findOneWithEmail(email: string): Promise<User | undefined> {
    const foundUser = await getRepository(User).findOne({ email });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return foundUser;
  }

  async updateAvatar(_id: string, file: any): Promise<boolean | undefined> {
    // console.log(_id, file)
    const foundUser = await getRepository(User).findOne({ _id });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    foundUser.avatar = await uploadFile(file);

    const updateUser = await getRepository(User).save(foundUser);

    return updateUser ? true : false;
  }

  async otp(_id: string, phone: string): Promise<OtpResponseDto | undefined> {
    // validator.isMobilePhone(phone, 'en-SG')

    const foundUser = await getRepository(User).findOne({
      where: {
        _id,
        verified: false
      }
    });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const token = await speakeasy.totp({
      secret: SPEAKEASY_SECRET!,
      encoding: 'base32',
      // digits: SPEAKEASY_DIGITS!
      step: SPEAKEASY_STEP! // 30s
      // window: 1 // pre 30s cur 30s nxt 30s
    });

    const remaining =
      SPEAKEASY_STEP -
      Math.floor((+new Date() / 1000.0) % SPEAKEASY_STEP) +
      's';

    foundUser.phone = phone;

    await getRepository(User).save(foundUser);

    return {
      otp: +token,
      remaining
    };
  }

  async verify(_id: string, otp: string) {
    const foundUser = await getRepository(User).findOne({
      where: {
        _id,
        verified: false
      }
    });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    // console.log(otp)

    const verified = await speakeasy.totp.verify({
      secret: SPEAKEASY_SECRET!,
      encoding: 'base32',
      token: otp,
      step: SPEAKEASY_STEP!, // 30s
      window: 1
    });

    // console.log(verified)

    if (verified) {
      foundUser.verified = true;

      return await getRepository(User).save(foundUser);
    }

    throw new ForbiddenException('Otp is incorrect.');
  }
}

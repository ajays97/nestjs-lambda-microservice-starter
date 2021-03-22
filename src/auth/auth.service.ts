import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/password';
import { User } from '../modules/users/entities/user.entity';
import { LoginResponseDto } from '../modules/users/dto/login-response.dto';
import { getRepository } from 'typeorm';
import { LoginUserDto } from '../modules/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await getRepository(User).findOne({
      where: {
        email
      }
    });

    if (user && (await comparePassword(password, user.password))) {
      // tslint:disable-next-line: no-shadowed-variable
      const { _password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email } = loginUserDto;
    const user = await getRepository(User).findOne({
      where: {
        email
      }
    });
    const payload = { sub: user._id };
    const expiresIn = 60 * 60 * 24 * 30;

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn
      }),
      user,
      expiresIn
    };
  }
}

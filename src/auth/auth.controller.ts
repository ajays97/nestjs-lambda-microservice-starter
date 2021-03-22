import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { LoginResponseDto } from 'src/modules/users/dto/login-response.dto';
import { LoginUserDto } from '../modules/users/dto/login-user.dto';
import { UsersService } from '../modules/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const loginResponseDto: LoginResponseDto = await this.authService.login(
      loginUserDto
    );
    return loginResponseDto;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    example: User,
    description: 'The user of the LoginResponse'
  })
  @IsNotEmpty()
  readonly user: User;

  @ApiProperty({
    example: 'xxxxxxxxxx',
    description: 'The accessToken of the LoginResponse'
  })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({
    example: 60 * 60 * 24 * 30,
    description: 'The expiresIn of the LoginResponse'
  })
  @IsNotEmpty()
  readonly expiresIn: number;
}

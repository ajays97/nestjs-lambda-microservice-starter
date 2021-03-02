import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { UserEntity } from '../entities/user.entity'

export class LoginResponseDto {
	@ApiProperty({
		example: UserEntity,
		description: 'The user of the LoginResponse'
	})
	@IsNotEmpty()
	readonly user: UserEntity

	@ApiProperty({
		example: 'xxxxxxxxxx',
		description: 'The accessToken of the LoginResponse'
	})
	@IsNotEmpty()
	readonly accessToken: string

	@ApiProperty({
		example: 60 * 60 * 24 * 30,
		description: 'The expiresIn of the LoginResponse'
	})
	@IsNotEmpty()
	readonly expiresIn: number
}
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({
		example: 'trinhchin',
		description: 'The name of the User'
	})
	@Length(5, 20)
	@IsNotEmpty()
	readonly name: string

	@ApiProperty({
		example: 'trinhchin.innos@gmail.com',
		description: 'The email of the User'
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty({
		example: '0',
		description: 'The password of the User'
	})
	@IsNotEmpty()
	readonly password: string

	@ApiProperty({
		example: '12341234',
		description: 'The referralCode of the User'
	})
	@Length(8, 8)
	@IsNotEmpty()
	readonly referralCode: string
}

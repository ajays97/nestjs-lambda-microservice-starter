import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ErrorResponseDto {
  @ApiProperty({
    example: '40x',
    description: 'The statusCode of the ErrorResponse'
  })
  @IsNotEmpty()
  readonly statusCode: string

  @ApiProperty({
    example: 'xxxxxxxxxx',
    description: 'The message of the ErrorResponse'
  })
  @IsNotEmpty()
  readonly message: string

  @ApiProperty({
    example: '2019-11-28T03:08:10.980Z',
    description: 'The timestamp of the ErrorResponse'
  })
  @IsNotEmpty()
  readonly timestamp: string

  @ApiProperty({
    example: '/v1',
    description: 'The path of the ErrorResponse'
  })
  @IsNotEmpty()
  readonly path: string
}

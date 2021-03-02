import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreatedByDto {
  @ApiProperty({
    example: 'xxxx-xxxx-xxxx-xxxx',
    description: 'The _id of the CreatedBy'
  })
  @IsNotEmpty()
  readonly _id: string

  @ApiProperty({
    example: 'xxxxxxxxxx',
    description: 'The name of the CreatedBy'
  })
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({
    example: 'https://xxx.xxx',
    description: 'The avatar of the CreatedBy'
  })
  @IsNotEmpty()
  readonly avatar: string
}

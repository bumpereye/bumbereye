import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'owner first name',
    example: 'Lev',
  })
  firstName: string;
  @ApiProperty({
    description: 'owner last name',
    example: 'Vysokiy',
  })
  lastName: string;
  @ApiProperty({
    description: 'owner email',
    example: 'fake@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'owner password',
    example: 'qwerty123',
  })
  password: string;
}

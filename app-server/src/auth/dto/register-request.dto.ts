import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @ApiProperty({
    description: 'owner first name',
    example: 'Lev',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'owner last name',
    example: 'Vysokiy',
  })
  lastName: string;

  @IsEmail()
  @ApiProperty({
    description: 'owner email',
    example: 'fake@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'owner password',
    example: 'qwerty123',
  })
  password: string;
}

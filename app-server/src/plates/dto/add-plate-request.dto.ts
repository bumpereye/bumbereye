import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPlateRequestDto {
  @IsString()
  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  licensePlate: string;
}

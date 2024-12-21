import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePlateRequestDto {
  @IsString()
  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  licensePlate: string;
}

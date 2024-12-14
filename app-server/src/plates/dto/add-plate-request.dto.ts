import { ApiProperty } from '@nestjs/swagger';

export class AddPlateRequestDto {
  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  licensePlate: string;
}

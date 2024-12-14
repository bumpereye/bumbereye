import { ApiProperty } from '@nestjs/swagger';
export class UpdatePlateRequestDto {
  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  licensePlate: string;
}

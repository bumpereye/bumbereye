import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    description: 'Unique identifier for the plate',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  access_token: string;
}

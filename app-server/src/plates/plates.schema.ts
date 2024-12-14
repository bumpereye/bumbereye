import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class Plate extends Document {
  @ApiProperty({
    description: 'Unique identifier for the plate',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Prop({ default: uuidv4 })
  id: string;

  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  @Prop({ required: true })
  licensePlate: string;

  @ApiProperty({
    description: 'Unique identifier for the owner of the plate',
    example: 'owner-123',
  })
  @Prop({ required: true })
  ownerId: string;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);

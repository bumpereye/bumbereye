import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, versionKey: false })
export class Plate extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  ownerId: string;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, versionKey: false })
export class Device extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  apiUrl: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);

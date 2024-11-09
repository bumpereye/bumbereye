import { Module } from '@nestjs/common';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';
import { PlateRecognitionWsModule } from '../integrations/plate-recognition-ws/plate-recognition-ws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Plate, PlateSchema } from './plates.schema';
import { ImageService } from 'src/image/image.service';
import { DevicesModule } from 'src/devices/devices.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    PlateRecognitionWsModule,
    MongooseModule.forFeature([{ name: Plate.name, schema: PlateSchema }]),
    DevicesModule,
    ImageModule,
  ],
  controllers: [PlatesController],
  providers: [PlatesService, ImageService],
})
export class PlatesModule {}

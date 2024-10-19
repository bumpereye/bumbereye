import { Module } from '@nestjs/common';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';
import { StorageModule } from '../storage/storage.module';
import { PlateRecognitionWsModule } from 'src/plate-recognition-ws/plate-recognition-ws.module';

@Module({
  imports: [StorageModule, PlateRecognitionWsModule],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}

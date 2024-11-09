import { Module } from '@nestjs/common';
import { PlateRecognitionWsService } from './plate-recognition-ws.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PlateRecognitionWsService],
  exports: [PlateRecognitionWsService],
})
export class PlateRecognitionWsModule {}

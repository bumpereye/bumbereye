import { Module } from '@nestjs/common';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';
import { PlateRecognitionWsModule } from '../plate-recognition-ws/plate-recognition-ws.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  imports: [PlateRecognitionWsModule],
  controllers: [PlatesController],
  providers: [PlatesService, RabbitMQService],
})
export class PlatesModule {}

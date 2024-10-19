import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';
import { ConfigModule } from '@nestjs/config';
import { PlateRecognitionWsModule } from './plate-recognition-ws/plate-recognition-ws.module';

@Module({
  imports: [
    PlatesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlateRecognitionWsModule,
  ],
})
export class AppModule {}

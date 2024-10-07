import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PlatesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StorageService } from './storage/storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [StorageService],
})
export class AppModule {}

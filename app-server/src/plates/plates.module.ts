import { Module } from '@nestjs/common';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}

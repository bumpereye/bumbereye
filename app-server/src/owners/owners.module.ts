import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './owners.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}

import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersModule } from './owners/owners.module';
import { DevicesModule } from './devices/devices.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtOwnerStrategy } from './auth/strategy/jwt-owner.strategy';
import { JwtDeviceStrategy } from './auth/strategy/jwt-device.strategy';
import { BaseWebService } from './integrations/base-web-service/base-web-service.service';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    PlatesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DATABASE_URL = configService.get<string>('DATABASE_URL');
        const DATABASE_NAME = configService.get<string>('DATABASE_NAME');

        const connectionString = `${DATABASE_URL}/${DATABASE_NAME}`;

        return {
          uri: connectionString,
        };
      },
    }),
    OwnersModule,
    DevicesModule,
    AuthModule,
    ImageModule,
  ],
  providers: [
    AuthService,
    JwtOwnerStrategy,
    JwtDeviceStrategy,
    BaseWebService,
    ImageService,
  ],
})
export class AppModule {}

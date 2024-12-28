import { OwnersModule } from './../owners/owners.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtOwnerStrategy } from './strategy/jwt-owner.strategy';
import { JwtDeviceStrategy } from './strategy/jwt-device.strategy';
import { DevicesModule } from 'src/devices/devices.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    OwnersModule,
    DevicesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtOwnerStrategy, JwtDeviceStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

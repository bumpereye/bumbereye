import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StrategyType } from '../enums/strategy-type.enum';
import { DeviceJwtPayload } from '../types/device-jwt-payload.type';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { JwtBaseStrategy } from './jwt-base.strategy';
import { Device } from 'src/devices/devices.shema';

@Injectable()
export class JwtDeviceStrategy extends JwtBaseStrategy<
  DeviceJwtPayload,
  Device
> {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super(configService, StrategyType.JwtDevice);
  }

  async validate(req: Request, payload: DeviceJwtPayload): Promise<Device> {
    const device = await this.authService.validateDeviceJwtPayload(payload);

    if (!device) {
      throw new UnauthorizedException('Invalid token');
    }

    req.device = device;

    return device;
  }
}

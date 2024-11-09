import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { StrategyType } from '../types/strategy-type.types';
import { DeviceJwtPayload } from '../types/device-jwt-payload.types';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtDeviceStrategy extends PassportStrategy(
  Strategy,
  StrategyType.JwtDevice,
) {
  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: DeviceJwtPayload) {
    const device = await this.authService.validateDeviceJwtPayload(payload);

    if (!device) {
      throw new UnauthorizedException('Invalid token');
    }

    req.device = device;

    return device;
  }
}

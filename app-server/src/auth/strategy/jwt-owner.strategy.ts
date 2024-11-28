import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { StrategyType } from '../types/strategy-type.types';
import { AuthService } from '../auth.service';
import { OwnerJwtPayload } from '../types/owner-jwt-payload.types';
import { Request } from 'express';

@Injectable()
export class JwtOwnerStrategy extends PassportStrategy(
  Strategy,
  StrategyType.JwtOwner,
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

  async validate(req: Request, payload: OwnerJwtPayload) {
    const owner = await this.authService.validateOwnerJwtPayload(payload);

    if (!owner?.active) {
      throw new UnauthorizedException('Invalid token');
    }

    req.owner = owner;

    return owner;
  }
}

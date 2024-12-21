import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StrategyType } from '../enums/strategy-type.enum';
import { AuthService } from '../auth.service';
import { OwnerJwtPayload } from '../types/owner-jwt-payload.type';
import { Request } from 'express';
import { Owner } from '../../owners/owners.shema';
import { JwtBaseStrategy } from './jwt-base.strategy';

@Injectable()
export class JwtOwnerStrategy extends JwtBaseStrategy<OwnerJwtPayload, Owner> {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super(configService, StrategyType.JwtOwner);
  }

  async validate(req: Request, payload: OwnerJwtPayload): Promise<Owner> {
    const owner = await this.authService.validateOwnerJwtPayload(payload);

    if (!owner || !owner.active) {
      throw new UnauthorizedException('Invalid token');
    }

    req.owner = owner;

    return owner;
  }
}

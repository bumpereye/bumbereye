import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Owner } from '../../owners/owners.shema';
import { Request } from 'express';
import { StrategyType } from '../enums/strategy-type.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyType.Local,
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    email: string,
    password: string,
  ): Promise<Owner> {
    const owner: Owner = await this.authService.validateOwnerByPassword(
      email,
      password,
    );

    if (!owner) {
      throw new UnauthorizedException('Invalid email or password');
    }

    req.owner = owner;

    return owner;
  }
}

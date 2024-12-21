import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export abstract class JwtBaseStrategy<
  TPayload,
  TResult,
> extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, name: string) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET'),
        passReqToCallback: true,
      },
      name,
    );
  }

  abstract validate(req: any, payload: TPayload): Promise<TResult>;
}

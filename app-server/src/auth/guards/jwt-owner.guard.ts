import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StrategyType } from '../enums/strategy-type.enum';
import { BaseJwtGuard } from './jwt-base.guard';

@Injectable()
export class JwtOwnerGuard extends BaseJwtGuard {
  constructor(reflector: Reflector) {
    super(reflector, StrategyType.JwtOwner);
  }
}

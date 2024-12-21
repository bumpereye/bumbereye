import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OwnersService } from '../owners/owners.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Owner } from '../owners/owners.shema';
import { OwnerJwtPayload } from './types/owner-jwt-payload.type';
import { DeviceJwtPayload } from './types/device-jwt-payload.type';
import { DevicesService } from '../devices/devices.service';
import { Device } from 'src/devices/devices.shema';
import { AccessTokenResponse } from './dto/access-token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly devicesService: DevicesService,
    private readonly jwtService: JwtService,
  ) {}

  private validatePassword(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateOwnerByPassword(
    email: string,
    password: string,
  ): Promise<Owner> {
    const owner = await this.ownersService.findByEmail(email);

    if (!owner || !owner.active) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await this.validatePassword(password, owner.password);

    if (!isMatch) {
      throw new BadRequestException('Passwords do not match');
    }

    return owner;
  }

  async validateOwnerJwtPayload(
    ownerJwtPayload: OwnerJwtPayload,
  ): Promise<Owner> {
    const owner = await this.ownersService.getById(ownerJwtPayload.id);

    if (!owner || !owner.active) {
      throw new BadRequestException('Owner not found');
    }

    return owner;
  }

  async validateDeviceJwtPayload(
    deviceJwtPayload: DeviceJwtPayload,
  ): Promise<Device> {
    const device = await this.devicesService.getById(deviceJwtPayload.id);

    if (!device) {
      throw new BadRequestException('Device not found');
    }

    return device;
  }

  async login(owner: Owner): Promise<AccessTokenResponse> {
    const { email, id } = owner;

    return { access_token: this.jwtService.sign({ email, id }) };
  }

  async register(body: RegisterRequestDto): Promise<AccessTokenResponse> {
    const existingOwner: Owner = await this.ownersService.findByEmail(
      body.email,
    );

    if (existingOwner) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(body.password);
    const createdOwner: Owner = await this.ownersService.create({
      ...body,
      password: hashedPassword,
    });

    return this.login(createdOwner);
  }
}

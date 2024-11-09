import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OwnersService } from '../owners/owners.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Owner } from '../owners/owners.shema';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { OwnerJwtPayload } from './types/owner-jwt-payload.types';
import { DeviceJwtPayload } from './types/device-jwt-payload.types';
import { DevicesService } from '../devices/devices.service';
import { Device } from 'src/devices/devices.shema';

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private devicesService: DevicesService,
    private jwtService: JwtService,
  ) {}

  async validateOwnerByPassword(
    email: string,
    password: string,
  ): Promise<Owner> {
    const owner = await this.ownersService.findOneByEmail(email);

    if (!owner.active) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, owner.password);

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return owner;
  }

  async validateOwnerJwtPayload(payload: OwnerJwtPayload): Promise<Owner> {
    const { id } = payload;

    const owner = await this.ownersService.getById(id);

    if (!owner.active) {
      throw new BadRequestException('Owner not found');
    }

    return owner;
  }

  async validateDeviceJwtPayload(payload: DeviceJwtPayload): Promise<Device> {
    const { id } = payload;

    const device = await this.devicesService.getById(id);

    if (!device) {
      throw new BadRequestException('Device not found');
    }

    return device;
  }

  async login(owner: Owner): Promise<LoginResponseDto> {
    const { email, id } = owner;

    const payload = { email, id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(owner: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { email, password } = owner;

    const existingOwner: Owner = await this.ownersService.findOneByEmail(email);

    if (existingOwner) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newOwner: Owner = await this.ownersService.create({
      ...owner,
      password: hashedPassword,
    });

    return this.login(newOwner);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './devices.shema';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  getById(deviceId: string): Promise<Device> {
    return this.deviceModel.findOne({ id: deviceId }).exec();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plate } from './plates.schema';
import { Model } from 'mongoose';
import { DevicesService } from '../devices/devices.service';
import { PlateRecognitionWsService } from 'src/integrations/plate-recognition-ws/plate-recognition-ws.service';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class PlatesService {
  constructor(
    @InjectModel(Plate.name) private plateModel: Model<Plate>,
    private readonly devicesService: DevicesService,
    private readonly plateRecognitionWsService: PlateRecognitionWsService,
    private readonly imageService: ImageService,
  ) {}

  getPlatesByOwnerId(ownerId: string): Promise<Plate[]> {
    return this.plateModel.find({ ownerId }).exec();
  }

  addPlate(licensePlate: string, ownerId: string): Promise<Plate> {
    return this.plateModel.create({ licensePlate, ownerId });
  }

  updatePlate(plateId: string, licensePlate: string): Promise<Plate> {
    return this.plateModel
      .findOneAndUpdate({ id: plateId }, { licensePlate }, { new: true })
      .exec();
  }

  async deletePlate(plateId: string): Promise<string> {
    await this.plateModel.deleteOne({ id: plateId }).exec();

    return 'OK';
  }

  findPlateByLicensePlate(licensePlate: string): Promise<Plate> {
    return this.plateModel.findOne({ licensePlate }).exec();
  }

  async findByOwnerIdAndLicensePlate(
    ownerId: string,
    licensePlate: string,
  ): Promise<Plate> {
    return this.plateModel.findOne({ ownerId, licensePlate }).exec();
  }

  async recognizePlate(
    deviceId: string,
    file: Express.Multer.File,
  ): Promise<Plate> {
    const results = await this.plateRecognitionWsService.recognizePlate(file);

    await this.imageService.uploadImage(file);

    const device = await this.devicesService.getById(deviceId);
    const { ownerId } = device;
    const { licensePlate } = results;

    const ownersPlate = await this.findByOwnerIdAndLicensePlate(
      ownerId,
      licensePlate,
    );

    if (!ownersPlate) {
      throw new NotFoundException('Plate for this owner not found');
    }

    return ownersPlate;
  }
}

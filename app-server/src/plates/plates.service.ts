import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plate } from './plates.schema';
import { Model } from 'mongoose';
import { PlateRecognitionWsService } from 'src/integrations/plate-recognition-ws/plate-recognition-ws.service';
import { ImageService } from 'src/image/image.service';
import { Device } from 'src/devices/devices.shema';

@Injectable()
export class PlatesService {
  constructor(
    @InjectModel(Plate.name) private plateModel: Model<Plate>,
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
    const deleteResult = await this.plateModel
      .deleteOne({ id: plateId })
      .exec();

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException('Plate not found');
    }

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
    device: Device,
    file: Express.Multer.File,
  ): Promise<Plate> {
    const { plate, metadata } =
      await this.plateRecognitionWsService.recognizePlate(file);

    await this.imageService.uploadImage(file, metadata);

    const ownersPlate = await this.findByOwnerIdAndLicensePlate(
      device.ownerId,
      plate,
    );

    if (!ownersPlate) {
      throw new NotFoundException('Plate for this owner not found');
    }

    return ownersPlate;
  }
}

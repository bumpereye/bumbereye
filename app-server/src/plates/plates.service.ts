import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PlatesService {
  constructor(private readonly storageService: StorageService) {}

  async getPlatePhotoUrl(file: Express.Multer.File) {
    const { originalname } = file;

    await this.storageService.uploadFile(file);

    return this.storageService.getObjectUrl(originalname);
  }
}

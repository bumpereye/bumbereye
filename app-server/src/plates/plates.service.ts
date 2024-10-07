import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PlatesService {
  constructor(private readonly storageService: StorageService) {}

  async uploadPlatePhoto(file: Express.Multer.File) {
    return this.storageService.uploadFile(file);
  }
}

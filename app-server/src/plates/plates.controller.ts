import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlatesService } from './plates.service';

@Controller('plates')
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognize(@UploadedFile() file: Express.Multer.File) {
    return this.platesService.uploadPlatePhoto(file);
  }
}

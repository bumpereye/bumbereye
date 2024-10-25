import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlateRecognitionWsService } from 'src/plate-recognition-ws/plate-recognition-ws.service';
import { PlatesService } from './plates.service';

@Controller('plates')
export class PlatesController {
  constructor(
    private readonly platesService: PlatesService,
    private readonly platesRecognitionWsService: PlateRecognitionWsService,
  ) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognize(@UploadedFile() file: Express.Multer.File) {
    const data = this.platesRecognitionWsService.recognizePlate(file);

    try {
      await this.platesService.sendImageToQueue(file);
    } catch (error) {
      console.error('failed to upload image', error);
    }

    return data;
  }
}

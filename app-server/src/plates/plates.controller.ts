import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlatesService } from './plates.service';
import { PlateRecognitionWsService } from 'src/plate-recognition-ws/plate-recognition-ws.service';

@Controller('plates')
export class PlatesController {
  constructor(
    private readonly platesService: PlatesService,
    private readonly platesRecognitionWsService: PlateRecognitionWsService,
  ) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognize(@UploadedFile() file: Express.Multer.File) {
    const url = await this.platesService.getPlatePhotoUrl(file);

    const data = await this.platesRecognitionWsService.recognizePlate(url);

    return data;
  }
}

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { PlatesService } from './plates.service';
import { PlateRecognitionWsService } from 'src/plate-recognition-ws/plate-recognition-ws.service';

@Controller('plates')
export class PlatesController {
  constructor(
    //private readonly platesService: PlatesService,
    private readonly platesRecognitionWsService: PlateRecognitionWsService,
  ) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognize(@UploadedFile() file: Express.Multer.File) {
    // TODO: Do with queue and microservice, push to queue from here
    //const url = await this.platesService.getPlatePhotoUrl(file);

    return this.platesRecognitionWsService.recognizePlate(file);
  }
}

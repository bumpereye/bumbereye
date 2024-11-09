import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { BaseWebService } from '../base-web-service/base-web-service.service';

@Injectable()
export class PlateRecognitionWsService extends BaseWebService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    const baseUrl = configService.get('PLATE_RECOGNITION_WS_URL');

    super(httpService, baseUrl);
  }

  async recognizePlate(
    file: Express.Multer.File,
  ): Promise<{ licensePlate: string }> {
    try {
      const formData = new FormData();

      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      return this.post('/recognize', formData, formData.getHeaders());
    } catch (error) {
      console.error(error);
    }
  }
}

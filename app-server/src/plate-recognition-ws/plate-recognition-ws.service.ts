import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import * as FormData from 'form-data';

@Injectable()
export class PlateRecognitionWsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async post({ url, body, headers }) {
    const wsBaseUrl = this.configService.get('PLATE_RECOGNITION_WS_URL');

    const { data } = await lastValueFrom(
      this.httpService.post(`${wsBaseUrl}${url}`, body, headers),
    );

    return data;
  }

  async recognizePlate(file: Express.Multer.File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      return this.post({
        body: formData,
        url: '/recognize',
        headers: formData.getHeaders(),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

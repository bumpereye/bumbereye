import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PlateRecognitionWsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async recognizePlate(url: string): Promise<any> {
    try {
      const wsBaseUrl = this.configService.get('PLATE_RECOGNITION_WS_URL');

      const { data } = await lastValueFrom(
        this.httpService.post(`${wsBaseUrl}/recognize`, {
          url,
        }),
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

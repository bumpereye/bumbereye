import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import * as FormData from 'form-data';
import { BaseWebService } from '../base-web-service/base-web-service.service';
import { Metadata, RecognizePlateResponseDTO } from './dto/recognize-plate.dto';

@Injectable()
export class PlateRecognitionWsService extends BaseWebService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    const baseUrl = configService.get('PLATE_RECOGNITION_WS_URL');

    super(httpService, baseUrl);
  }

  convertMetadata(metadata: Metadata) {
    const { candidates, coordinates, region } = metadata;

    return {
      candidates: JSON.stringify(candidates),
      coordinates: JSON.stringify(coordinates),
      region,
    };
  }

  async recognizePlate(
    file: Express.Multer.File,
  ): Promise<RecognizePlateResponseDTO> {
    try {
      const formData = new FormData();

      const fileStream = Readable.from(file.buffer);

      formData.append('file', fileStream, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const result = await this.post(
        '/recognize',
        formData,
        formData.getHeaders(),
      );

      return {
        ...result,
        metadata: this.convertMetadata(result.metadata),
      };
    } catch (error) {
      console.error(error);
    }
  }
}

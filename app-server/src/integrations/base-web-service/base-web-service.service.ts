import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export class BaseWebService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly baseUrl: string,
  ) {}

  async post(endpoint: string, body: any, headers: any): Promise<any> {
    const { data } = await lastValueFrom(
      this.httpService.post(`${this.baseUrl}${endpoint}`, body, headers),
    );

    return data;
  }
}

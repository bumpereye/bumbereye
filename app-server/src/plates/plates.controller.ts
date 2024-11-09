import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlatesService } from './plates.service';
import { JwtOwnerGuard } from 'src/auth/guards/jwt-owner.guard';
import { JwtDeviceGuard } from 'src/auth/guards/jwt-device.guard';
import { Request as ExpressRequest } from 'express';
import { Plate } from './plates.schema';
import { AddPlateRequestDto } from './dto/add-plate-request.dto';
import { UpdatePlateRequestDto } from './dto/update-plate-request.dto';

@UseGuards(JwtOwnerGuard)
@Controller('plates')
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @Get()
  async getOwnersPlates(@Request() req: ExpressRequest): Promise<Plate[]> {
    const ownerId = req.owner.id;

    return this.platesService.getPlatesByOwnerId(ownerId);
  }

  @Post()
  async addPlate(
    @Request() req: ExpressRequest,
    @Body() body: AddPlateRequestDto,
  ): Promise<Plate> {
    const ownerId = req.owner.id;
    const { licensePlate } = body;

    return this.platesService.addPlate(licensePlate, ownerId);
  }

  @Patch(':plateId')
  async updatePlate(
    @Param('plateId') plateId: string,
    @Body() body: UpdatePlateRequestDto,
  ): Promise<Plate> {
    const { licensePlate } = body;

    return this.platesService.updatePlate(plateId, licensePlate);
  }

  @Delete(':plateId')
  async deletePlate(@Param('plateId') plateId: string): Promise<string> {
    return this.platesService.deletePlate(plateId);
  }

  @UseGuards(JwtDeviceGuard)
  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognize(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: ExpressRequest,
  ): Promise<Plate> {
    const deviceId = req.device.id;

    return this.platesService.recognizePlate(deviceId, file);
  }
}

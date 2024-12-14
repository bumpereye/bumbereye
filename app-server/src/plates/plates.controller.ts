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
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ApiFile } from './decorators/api-file.decorator';

@ApiTags('Plates')
@ApiBearerAuth()
@Controller('plates')
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @UseGuards(JwtOwnerGuard)
  @ApiOperation({ summary: 'Get all plates for the authenticated owner' })
  @ApiOkResponse({
    description: 'List of plates',
    isArray: true,
    type: Plate,
  })
  @Get()
  async getOwnersPlates(@Request() req: ExpressRequest): Promise<Plate[]> {
    const ownerId = req.owner.id;

    return this.platesService.getPlatesByOwnerId(ownerId);
  }

  @UseGuards(JwtOwnerGuard)
  @ApiOperation({ summary: 'Add a new plate for the authenticated owner' })
  @ApiBody({ type: AddPlateRequestDto })
  @ApiOkResponse({
    description: 'Created plate',
    type: Plate,
  })
  @Post()
  async addPlate(
    @Request() req: ExpressRequest,
    @Body() body: AddPlateRequestDto,
  ): Promise<Plate> {
    const ownerId = req.owner.id;
    const { licensePlate } = body;

    return this.platesService.addPlate(licensePlate, ownerId);
  }

  @UseGuards(JwtOwnerGuard)
  @ApiOperation({ summary: 'Update an existing plate by plateId' })
  @ApiParam({ name: 'plateId', description: 'The ID of the plate to update' })
  @ApiBody({ type: UpdatePlateRequestDto })
  @ApiOkResponse({
    description: 'Updated plate',
    type: Plate,
  })
  @Patch(':plateId')
  async updatePlate(
    @Param('plateId') plateId: string,
    @Body() body: UpdatePlateRequestDto,
  ): Promise<Plate> {
    const { licensePlate } = body;

    return this.platesService.updatePlate(plateId, licensePlate);
  }

  @UseGuards(JwtOwnerGuard)
  @ApiOperation({ summary: 'Delete a plate by plateId' })
  @ApiParam({ name: 'plateId', description: 'The ID of the plate to delete' })
  @ApiOkResponse({
    description: 'Successful response',
    type: String,
  })
  @Delete(':plateId')
  async deletePlate(@Param('plateId') plateId: string): Promise<string> {
    return this.platesService.deletePlate(plateId);
  }

  @UseGuards(JwtDeviceGuard)
  @ApiOperation({ summary: 'Recognize a plate from an uploaded image' })
  @ApiConsumes('multipart/form-data')
  @ApiFile('The image file to be processed')
  @ApiOkResponse({
    description: 'Recognized plate',
    type: Plate,
  })
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

import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ApiLoginBody } from './decorators/api-login-body.decorator';
import { AccessTokenResponse } from './dto/access-token-response.dto';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login a user and return an access token' })
  @ApiLoginBody()
  @ApiOkResponse({
    description: 'Access token',
    type: AccessTokenResponse,
  })
  @Post('login')
  async login(@Request() req: ExpressRequest): Promise<AccessTokenResponse> {
    return this.authService.login(req.owner);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterRequestDto })
  @ApiOkResponse({
    description: 'Access token',
    type: AccessTokenResponse,
  })
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<AccessTokenResponse> {
    return await this.authService.register(registerBody);
  }
}

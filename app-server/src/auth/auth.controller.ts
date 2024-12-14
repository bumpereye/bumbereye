import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ApiLoginBody } from './decorators/api-login-body.decorator';

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
    type: LoginResponseDto,
  })
  @Post('login')
  async login(@Request() req: ExpressRequest): Promise<LoginResponseDto> {
    return this.authService.login(req.owner);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterRequestDto })
  @ApiOkResponse({
    description: 'Access token',
    type: RegisterResponseDto,
  })
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerBody);
  }
}

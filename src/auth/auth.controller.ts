import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/token')
  async login(@Query('code') code: string): Promise<string> {
    return await this.authService.getDiscordToken(code);
  }
}

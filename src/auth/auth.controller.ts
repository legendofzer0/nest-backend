import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPayloadDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authPlayLoad: authPayloadDto) {
    return this.authService.ValidateUser(authPlayLoad);
  }
  @Post('getData')
  decodeJWT(@Body() payload: { token: string }) {
    return this.authService.decodeJWT(payload);
  }
}

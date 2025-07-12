import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './domain/dto/authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }
}

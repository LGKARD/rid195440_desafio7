import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import { AuthRegisterDTO } from './domain/dto/authRegister.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
}

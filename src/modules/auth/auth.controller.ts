import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import { AuthRegisterDTO } from './domain/dto/authRegister.dto';
import { AuthResetPasswordDTO } from './domain/dto/authResetPassword.dto';
import { AuthForgotPasswordDTO } from './domain/dto/authForgotPassword.dto';

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

  @Patch('reset-password')
  resetPassword(@Body() { token, password }: AuthResetPasswordDTO) {
    return this.authService.resetPassword({ token, password });
  }

  @Post('forgot-password')
  forgot(@Body() { email }: AuthForgotPasswordDTO) {
    return this.authService.forgot(email);
  }
}

/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signUp')
  async signup(
    @Body('email') email: string, 
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
  ) {
    return this.authService.signUp(email, password, name, phone);
  }

  @Post('signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }
}

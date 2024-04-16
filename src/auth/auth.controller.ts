import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authInterface, signinInterface } from './interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() req: authInterface) {
    return this.authService.signup(req);
  }

  @Post('signin')
  signin(@Body() req: signinInterface) {
    return this.authService.login(req);
  }
}

import { Body, Headers, Controller, Get, Post } from '@nestjs/common';
import {} from './user.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUser(@Headers() headers) {
    return this.userService.UserGet(headers);
  }
}

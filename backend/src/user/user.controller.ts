import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('find-all')
    findAll() {
      return this.userService.findAll();
    }
  
    @Get('find-by-home/:homeId')
    findByHome(@Param('homeId') homeId: number) {
      return this.userService.findByHome(homeId);
    }
}

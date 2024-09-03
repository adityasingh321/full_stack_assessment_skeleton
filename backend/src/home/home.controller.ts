import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateUsersDto } from './dto/update_user.dto';
import { PageOptionsDto } from '../common/dto/page_options.dto';
import { plainToInstance } from 'class-transformer';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) { }
    @Get('find-by-user/:userId')
    async findByUser(@Param('userId') userId: number, @Query() pageOptionsDto: PageOptionsDto) {
        pageOptionsDto = plainToInstance(PageOptionsDto, pageOptionsDto);
      return this.homeService.findByUser(userId, pageOptionsDto);

    }
  
    @Put('update-users')
    updateMappedUsers(@Body() updateUsersDto: UpdateUsersDto) {        
      return this.homeService.updateMappedUsers(updateUsersDto);
    }
}

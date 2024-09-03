import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Home } from './entities/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dto/update_user.dto';
import { UserService } from 'src/user/user.service';
import { HOME_FIELDS } from 'src/common/constants/home.constant';
import { PageOptionsDto } from '../common/dto/page_options.dto';
import { PageMetaDto } from 'src/common/dto/page_meta.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async findByUser(
    userId: number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Home>> {
    const { page, take, order, skip } = pageOptionsDto;

    const [homes, itemCount] = await this.homeRepository
      .createQueryBuilder('home')
      .leftJoinAndSelect('home.users', 'user')
      .where('user.id = :userId', { userId })
      .select(HOME_FIELDS)
      .orderBy('home.id', order)
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptionsDto,
    });
    return new PageDto(homes, pageMetaDto);
  }

  async findHomeById(homeId: number) {
    const home = await this.homeRepository.findOne({
      where: {
        id: homeId,
      },
      relations: ['users'],
    });

    if (!home) {
      throw new NotFoundException(`No home found with homeId ${homeId}`);
    }
    return home;
  }

  async updateMappedUsers(updateUsersDto: UpdateUsersDto) {
    const { homeId, userIds } = updateUsersDto;

    const home = await this.findHomeById(homeId);

    const users = await this.userService.findUsers(userIds);

    home.users = users;
    await this.homeRepository.save(home);
    return await this.findHomeById(homeId);
  }
}

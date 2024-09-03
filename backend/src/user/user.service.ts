import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_FIELDS } from 'src/common/constants/user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByHome(homeId: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.homes', 'home')
      .where('home.id = :homeId', { homeId })
      .select(USER_FIELDS)
      .getMany();
  }

  async findUsers(userIds: number[]): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });
    if (users.length !== userIds.length) {
      throw new NotAcceptableException('All of the userIds must be valid');
    }
    return users;
  }
}

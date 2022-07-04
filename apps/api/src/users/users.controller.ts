import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';

import { UsersService } from './users.service';

@Controller({path: 'users'})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }
}

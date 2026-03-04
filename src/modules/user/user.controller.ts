import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getUsers(): Promise<any> {
    return this.userService.findAll();
  }
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<any> {
    return this.userService.findOne(parseInt(id));
  }
  // @Get('/:username')
  // getUser(@Param('username') username: string) {
  //   return this.userService.findOne(username);
  // }

  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: { email: string; password: string },
  ) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}

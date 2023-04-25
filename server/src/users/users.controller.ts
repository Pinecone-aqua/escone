import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './users.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  getAllUser() {
    return this.userService.getAllUsers();
  }
  @Post('add')
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.deleteUser(id);
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}

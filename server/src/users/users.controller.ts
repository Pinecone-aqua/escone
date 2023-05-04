import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './users.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('all')
  getAllUser() {
    return this.userService.getAllUsers();
  }
  @Post('add')
  addUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.addUser(createUserDto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.deleteUser(id);
  }
  @Get('google')
  getGoogle() {
    return this.userService.googleLogin();
  }

  @Get('google-callback')
  async getGoogleCallback(@Query('code') code: string, @Res() res: Response) {
    const user = await this.userService.verifyGoogle(code);

    if (user.error) {
      return 'error';
    }

    const result = await this.userService.getUserInfo(user);

    if (result && result[0].email == user.email) {
      const token = this.jwtService.sign(result[0].toJSON());
      res
        .status(200)
        .cookie('token', token)
        .redirect(`http://localhost:${process.env.CLIENT_PORT}`);
    }
  }
  @Get('login')
  async getLogin(@Query('token') token: string, @Res() res: Response) {
    const user = this.jwtService.decode(token);
    const result = await this.userService.getLogin(user);
    if (result.status) {
      res.status(200).send(result);
    } else {
      res.status(203).send(result);
    }
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Headers,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './users.service';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

dotenv.config();

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Get('status')
  getUserStatus() {
    return this.userService.getUserStatus();
  }
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
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Param('id') id: string,
    @Body() body: any,
    @Headers() Headers: any,
    @UploadedFile() Image?: Express.Multer.File,
  ) {
    console.log(Image);
    const [type, token] = Headers.authorization?.split(' ') ?? [];
    if (!token) {
      return 'have not token';
    }
    const decodedToken: any = this.jwtService.decode(token);
    if (!decodedToken) {
      return 'token extist';
    }

    if (decodedToken._id != id || decodedToken.role == false) {
      return 'you have not permission';
    }
    const user = await this.userService.getUser(id);
    let userBody: any = {};
    if (body.favorites) {
      userBody.favorites = [];
      const favIds = body.favorites.map((id) => new ObjectId(id));
      userBody.favorites.push(...favIds);
    }

    if (body.body) {
      userBody = JSON.parse(body.body);
      if (userBody.oldpassword) {
        if (user.password) {
          const passwordCheck = await bcrypt.compare(
            userBody.oldpassword,
            user.password,
          );

          if (!passwordCheck) return 'password is wrong';
        } else if (userBody.password) {
          userBody.password = await bcrypt.hash(userBody.password, 7);
        }
        delete userBody.oldpassword;
      }
    }
    if (Image) {
      const { secure_url } = await this.cloudinaryService.uploadImage(Image);
      userBody.image = secure_url;
    }

    console.log(userBody);
    const result = await this.userService.updateUser(id, userBody);
    console.log(result);

    if (result) {
      const token = this.jwtService.sign(userBody);
      console.log(token, 'token');
      return { token };
    }
    console.log('hh');
    return 'll';
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

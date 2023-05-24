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
    try {
      return this.userService.getUserStatus();
    } catch (error) {
      return error;
    }
  }
  @Get('all')
  getAllUser(@Query() query: any) {
    try {
      let limit = 8;
      let page = 1;
      let order_by = {};
      let queryOption: any = { $and: [] };
      if (query.role) {
        const booleanRole = query.role == 'admin';
        queryOption.$and.push({ role: booleanRole });
      }
      if (query.order_by) {
        if (query.type) {
          order_by = { [query.order_by]: Number(query.type) };
        }
      }
      if (query.limit) {
        limit = Number(query.limit);
      }
      if (query.page) {
        page = Number(query.page);
      }
      if (query.search) {
        const searchQuery = {
          $or: [
            { username: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } },
          ],
        };
        queryOption.$and.push(searchQuery);
      }

      if (
        Object.keys(query).filter((key) => {
          if (key == 'limit') return;
          if (key == 'page') return;
          if (key == 'order_by') return;
          if (key == 'type') return;
          if (key == 'user') return;
          return key;
        }).length == 0
      ) {
        queryOption = {};
      }
      console.log(queryOption);
      return this.userService.getAllUsers(queryOption, limit, page, order_by);
    } catch (error) {
      return error;
    }
  }
  @Post('add')
  addUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.addUser(createUserDto);
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Headers() Headers: any) {
    try {
      const [type, token] = Headers.authorization?.split(' ') ?? [];
      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }
      if (decodedToken._id == id || decodedToken.role == true) {
        return this.userService.deleteUser(id);
      }
      return 'you have not permission';
    } catch (error) {
      return error;
    }
  }
  @Get('google')
  getGoogle() {
    try {
      return this.userService.googleLogin();
    } catch (error) {
      return error;
    }
  }
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Param('id') id: string,
    @Body() body: any,
    @Headers() Headers: any,
    @UploadedFile() Image?: Express.Multer.File,
  ) {
    try {
      const [type, token] = Headers.authorization?.split(' ') ?? [];
      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }

      if (decodedToken._id == id || decodedToken.role == true) {
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
          } else {
            userBody.password = await bcrypt.hash(userBody.password, 7);
          }
        }
        if (Image) {
          const { secure_url } = await this.cloudinaryService.uploadImage(
            Image,
          );
          userBody.image = secure_url;
        }
        const result = await this.userService.updateUser(id, userBody);

        if (result) {
          const user = await this.userService.getUser(id);
          const token = this.jwtService.sign(user.toJSON());

          return { token };
        }
      }
      return 'you have not permission';
    } catch (error) {
      return error;
    }
  }
  @Get('google-callback')
  async getGoogleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const user = await this.userService.verifyGoogle(code);

      if (user.error) {
        return 'error';
      }

      const result = await this.userService.getUserInfo(user);

      if (result && result[0].email == user.email) {
        const token = this.jwtService.sign(result[0].toJSON());
        res.status(200).redirect(`${process.env.CLIENT_URL}/?token=${token}`);
      }
    } catch (error) {
      return 'eroor';
    }
  }
  @Get('login')
  async getLogin(@Query('token') token: string, @Res() res: Response) {
    try {
      const user = this.jwtService.decode(token);
      const result = await this.userService.getLogin(user);
      if (result.status) {
        res.status(200).send(result);
      } else {
        res.status(203).send(result);
      }
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    try {
      return this.userService.getUser(id);
    } catch (error) {
      return error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import * as queryString from 'query-string';
import { getAccessTokenFromCode } from './getAccessToken';
import fetch from 'node-fetch';
import * as moment from 'moment';

dotenv.config();

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  users = [];
  async getAllUsers() {
    const result = await this.userModel.find({});
    // console.log(result);
    return result;
  }
  async getUser(id: string) {
    console.log('this is user id: ', typeof id);
    const result = await this.userModel.findOne({ _id: { $eq: id } });
    // console.log(result);

    return result;
  }
  async googleLogin() {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: `http://localhost:${process.env.PORT}/user/google-callback`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  }

  async getUserInfo(user) {
    const findEmail = await this.userModel.find({ email: user.email }).limit(1);

    const date = moment().format();
    console.log(findEmail.length != 1, findEmail.length);
    if (findEmail.length != 1) {
      const newUser = {
        username: user.name,
        image: user.picture,
        email: user.email,
        role: false,
        favorites: [],
        created_date: date,
      };
      const result = await this.userModel.insertMany(newUser);

      return result;
    } else {
      return findEmail;
    }
  }
  async getLogin(user) {
    const result = this.userModel.find({
      $and: [{ email: user.email }, { password: user.password }],
    });
    return result;
  }
  async verifyGoogle(code) {
    const access_token: any = await getAccessTokenFromCode(code);
    const user = await getGoogleUserInfo(access_token);

    return user;

    async function getGoogleUserInfo(access_token: string) {
      const data = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ).then((res) => res.json());

      return data;
    }
  }
  async addUser(user: CreateUserDto) {
    const date = moment().format();
    const nsn = await bcrypt.hash(user.password, 247);
    console.log(nsn);
    const newUser = {
      ...user,
      _role: false,
      get role() {
        return this._role;
      },
      set role(value) {
        this._role = value;
      },
      favorites: [],
      created_date: date,
    };
    const userCheck = await this.userModel.find({ email: user.email }).limit(1);
    if (userCheck.length == 1) return 'already have an account';
    const resilt = await this.userModel.insertMany(newUser);
    return resilt;
  }
  async deleteUser(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });
    // console.log(result);
    return `deleted user ${result}`;
  }
}

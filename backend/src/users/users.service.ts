import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateUserDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  users = [];
  async getAllUsers() {
    const result = await this.userModel.find({});
    console.log(result);
    return result;
  }
  async getUser(id: string) {
    console.log('this is user id: ', typeof id);
    const result = await this.userModel.findOne({ _id: { $eq: id } });
    console.log(result);

    return result;
  }
  async addUser(user: CreateUserDto) {
    console.log(user);
    const resilt = await this.userModel.insertMany(user);
    return `success ${resilt}`;
  }
  async deleteUser(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });
    console.log(result);
    return `deleted user ${result}`;
  }
}

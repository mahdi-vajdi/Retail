import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(phone: string) {
    const foundUser = await this.userModel.findOne({ phone }).exec();
    if (!foundUser) console.log('no user');
    return foundUser;
  }
}

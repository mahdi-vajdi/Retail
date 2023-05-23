import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { ProfileService } from 'src/profile/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private profileService: ProfileService,
  ) {}

  async create(signupDto: SignupDto) {
    const duplicate = await this.findOne(signupDto.phone);
    if (duplicate) throw new ConflictException();

    // Hash the password
    const hashedPass = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = hashedPass;

    const createdUser = await this.userModel.create(signupDto);
    // Create profile for the user
    await this.profileService.create(createdUser);

    return createdUser;
  }

  async findOne(phone: string) {
    const foundUser = await this.userModel.findOne({ phone }).exec();
    if (!foundUser) console.log('no user');
    return foundUser;
  }

  async updatePhone(id: string, phone: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { phone: phone },
      { returnDocument: 'after' },
    );

    return user;
  }

  async updatePassword(id: string, hashedPass: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { password: hashedPass },
      { returnDocument: 'after' },
    );

    return user;
  }
}

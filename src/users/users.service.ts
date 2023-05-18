import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private profileService: ProfileService,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const duplicate = await this.findSingleUser(registerDto.phone);
    if (duplicate) throw new ConflictException();

    const createdUser = await this.userModel.create(registerDto);
    // Create profile for the user
    const newProfile = new CreateProfileDto(createdUser.id);
    console.log(createdUser.id);
    await this.profileService.create(newProfile);

    return createdUser;
  }

  async findSingleUser(phone: string) {
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

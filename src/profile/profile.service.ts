import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(user: User) {
    return this.profileModel.create({ user });
  }

  async findOne(userId: string) {
    const foundProfile = await this.profileModel.findOne({ user: userId });
    if (!foundProfile)
      throw new NotFoundException(`Could not find any Profile for the user`);
    return foundProfile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      {
        user: userId,
      },
      updateProfileDto,
      { returnDocument: 'after' },
    );
    if (!updatedProfile)
      throw new NotFoundException(`Could not find any profile for ther user`);
    return updatedProfile;
  }

  async remove(userId: string) {
    const deletedProfile = await this.profileModel.findOneAndUpdate({
      user: userId,
    });
    if (!deletedProfile)
      throw new NotFoundException(`There was no profile for the user`);
    return deletedProfile;
  }
}

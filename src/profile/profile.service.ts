import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const createdProfile = await this.profileModel.create(createProfileDto);
    return createdProfile;
  }

  async findOne(id: string) {
    const foundProfile = await this.profileModel.findById(id).exec();
    if (!foundProfile)
      throw new NotFoundException(
        `Could not find any Profile mathcing the id: ${id}`,
      );
    return foundProfile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { returnDocument: 'after' },
    );
    if (!updatedProfile)
      throw new NotFoundException(
        `Could not find any profile mathcing the id: ${id}`,
      );
    return updatedProfile;
  }

  async remove(id: number) {
    const deletedProfile = await this.profileModel.findByIdAndDelete(id);
    if (!deletedProfile)
      throw new NotFoundException(
        `Could not find any profile mathcing the id: ${id}`,
      );
    return deletedProfile;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './schemas/address.schema';

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

  // Address related function

  async addAddresses(userId: string, dto: CreateAddressDto) {
    const user = await this.profileModel.findOne({ user: userId });
    if (!user) return null;

    user.addresses.push(dto);
    await user.save();
  }

  async findAddresses(userId: string) {
    const user = await this.findOne(userId);
    if (!user) return null;

    return user.addresses;
  }

  async updateOneAddress(userId: string, updateAddressDto: UpdateAddressDto) {
    const user = await this.findOne(userId);
    if (!user) return null;

    const index = user.addresses.findIndex((obj: Address) => {
      return obj.id === updateAddressDto.addressId;
    });
    if (!index) return null;

    user.addresses[index] = updateAddressDto;
    user.save();
  }

  async removeAddress(userId: string, addressId: string) {
    const user = await this.findOne(userId);
    if (!user) return null;

    const pos = user.addresses.findIndex((el) => el.id === addressId);
    if (pos >= 0) user.addresses.splice(pos, 1);

    console.log(user.addresses);

    user.save();
  }
}

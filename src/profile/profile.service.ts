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

  async findOne(user: User) {
    const foundProfile = await this.profileModel.findOne({ user: user });
    if (!foundProfile)
      throw new NotFoundException(`Could not find any Profile for the user`);
    return foundProfile;
  }

  async update(user: User, updateProfileDto: UpdateProfileDto) {
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      {
        user: user,
      },
      updateProfileDto,
      { returnDocument: 'after' },
    );
    if (!updatedProfile)
      throw new NotFoundException(`Could not find any profile for ther user`);
    return updatedProfile;
  }

  async remove(user: User) {
    const deletedProfile = await this.profileModel.findOneAndUpdate({
      user: user,
    });
    if (!deletedProfile)
      throw new NotFoundException(`There was no profile for the user`);
    return deletedProfile;
  }

  // Address related function

  async addAddresses(user: User, dto: CreateAddressDto) {
    const foundUser = await this.profileModel.findOne({ user: user });
    if (!foundUser) return null;

    foundUser.addresses.push(dto);
    await foundUser.save();
  }

  async findAddresses(user: User) {
    const foundUser = await this.findOne(user);
    if (!foundUser) return null;

    return foundUser.addresses;
  }

  async updateOneAddress(user: User, updateAddressDto: UpdateAddressDto) {
    const foundUser = await this.findOne(user);
    if (!foundUser) return null;

    const index = foundUser.addresses.findIndex((obj: Address) => {
      return obj.id === updateAddressDto.addressId;
    });
    if (!index) return null;

    foundUser.addresses[index] = updateAddressDto;
    foundUser.save();
  }

  async removeAddress(user: User, addressId: string) {
    const foundUser = await this.findOne(user);
    if (!foundUser) return null;

    const pos = foundUser.addresses.findIndex((el) => el.id === addressId);
    if (pos >= 0) foundUser.addresses.splice(pos, 1);

    console.log(foundUser.addresses);

    foundUser.save();
  }
}

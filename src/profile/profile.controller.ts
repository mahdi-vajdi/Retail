import { Controller, Get, Body, Patch, Delete, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { UserId } from '../users/decorators/userId.decorator';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  async findOne(@UserId() userId: string) {
    return this.profileService.findOne(userId);
  }

  @Patch()
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  update(@UserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(userId, updateProfileDto);
  }

  @Patch('address')
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  updateAddresses(
    @UserId() userId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.profileService.updateOneAddress(userId, updateAddressDto);
  }

  @Delete('address/:id')
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  removeAddress(@UserId() userId: string, @Param('id') addressId: string) {
    this.profileService.removeAddress(userId, addressId);
  }
}

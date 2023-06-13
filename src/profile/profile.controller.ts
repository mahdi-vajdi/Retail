import { Controller, Get, Body, Patch, Delete, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { UserDec } from '../users/decorators/userId.decorator';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from '../users/schemas/user.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  async findOne(@UserDec() user: User) {
    return this.profileService.findOne(user);
  }

  @Patch()
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  update(@UserDec() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user, updateProfileDto);
  }

  @Patch('address')
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  updateAddresses(
    @UserDec() user: User,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.profileService.updateOneAddress(user, updateAddressDto);
  }

  @Delete('address/:id')
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  removeAddress(@UserDec() user: User, @Param('id') addressId: string) {
    this.profileService.removeAddress(user, addressId);
  }
}

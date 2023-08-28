import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDec } from '../users/decorators/userId.decorator';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from '../users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@UserDec() user: User) {
    return this.profileService.findOne(user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@UserDec() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user, updateProfileDto);
  }

  @Patch('address')
  @UseGuards(JwtAuthGuard)
  updateAddresses(
    @UserDec() user: User,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.profileService.updateOneAddress(user, updateAddressDto);
  }

  @Delete('address/:id')
  @UseGuards(JwtAuthGuard)
  removeAddress(@UserDec() user: User, @Param('id') addressId: string) {
    this.profileService.removeAddress(user, addressId);
  }
}

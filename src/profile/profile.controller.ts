import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { UserId } from '../users/decorators/userId.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Roles(Role.MANAGER, Role.ADMIN, Role.CUSTOMER)
  async findOne(@UserId() userId: string) {
    return this.profileService.findOne(userId);
  }

  @Patch()
  @Roles(Role.MANAGER, Role.ADMIN)
  update(@UserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(userId, updateProfileDto);
  }
}

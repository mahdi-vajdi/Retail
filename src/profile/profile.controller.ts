import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { UserRoles } from 'src/users/roles/roles.enum';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}

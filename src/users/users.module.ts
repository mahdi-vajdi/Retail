import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, userSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}

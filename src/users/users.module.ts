import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, userSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

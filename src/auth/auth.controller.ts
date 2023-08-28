import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Serialize } from 'src/common/serialize.interceptor';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Req() req: Request) {
    return this.authService.signin(req.user as User);
  }

  @Serialize(UserResponseDto)
  @Post('register')
  @UsePipes(ValidationPipe)
  signup(@Body() registerDto: SignupDto) {
    return this.authService.signup(registerDto);
  }

  @Post('refresh')
  async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
    const accessToken = await this.authService.refreshToken(refresh_token);
    return { access_token: accessToken };
  }
}

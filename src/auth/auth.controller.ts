import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Serialize } from 'src/common/serialize.interceptor';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(UserDto)
  @Post('register')
  @UsePipes(ValidationPipe)
  signup(@Body() registerDto: SignupDto) {
    return this.authService.signup(registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signin(signInDto.phone, signInDto.password);
  }

  @Post('refresh')
  async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
    const accessToken = await this.authService.refreshToken(refresh_token);
    return { access_token: accessToken };
  }
}

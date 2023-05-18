import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Serialize } from 'src/common/serialize.interceptor';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(UserDto)
  @Post('register')
  @UsePipes(ValidationPipe)
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signin(signInDto.phone, signInDto.password);
  }

  @Post('refresh')
  refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
    const accessToken = this.authService.refreshToken(refresh_token);
    return accessToken;
  }
}

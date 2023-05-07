import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.gaurd';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.phone, signInDto.password);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  refresh(@Body() { refresh_token }: RefreshTokenDto) {
    const accessToken = this.authService.refresh(refresh_token);
    return accessToken;
  }
}

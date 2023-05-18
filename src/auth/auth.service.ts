import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const createdUser = this.usersService.create(signupDto);
    return createdUser;
  }

  async signin(phone: string, pass: string) {
    const user = await this.usersService.findOne(phone);

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = { phone: user.phone, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshToken: string) {
    const isValid = await this.jwtService.verifyAsync(refreshToken);
    if (!isValid) throw new UnauthorizedException();

    const payload = this.jwtService.decode(refreshToken);
    delete payload['exp'] && delete payload['iat'];

    return await this.jwtService.signAsync(payload);
  }
}

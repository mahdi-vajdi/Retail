import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const createdUser = this.usersService.createUser(registerDto);
    return createdUser;
  }

  async login(phone: string, pass: string) {
    const user = await this.usersService.findSingleUser(phone);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { phone: user.phone, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refresh(refreshToken: string) {
    const isValid = await this.jwtService.verifyAsync(refreshToken);
    if (!isValid) throw new UnauthorizedException();

    const payload = this.jwtService.decode(refreshToken);
    delete payload['exp'] && delete payload['iat'];

    return await this.jwtService.signAsync(payload);
  }

  async hashPass(password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}

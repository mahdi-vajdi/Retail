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
    return { acces_token: await this.jwtService.signAsync(payload) };
  }

  async hashPass(password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}

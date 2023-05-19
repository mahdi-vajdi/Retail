import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt/jwt.interface';
import { JwtType } from './jwt/jwt.enum';

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

    return {
      access_token: this.jwtService.sign(
        { id: user.id, token_type: JwtType.ACCESS },
        { expiresIn: '2h' },
      ),
      refresh_token: this.jwtService.sign(
        { id: user.id, token_type: JwtType.REFRESH },
        { expiresIn: '7d' },
      ),
    };
  }

  async refreshToken(refreshToken: string) {
    let tokenPayload: JwtPayload;

    try {
      tokenPayload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // validate the payload
    if (!tokenPayload) throw new UnauthorizedException();
    if (tokenPayload.token_type !== JwtType.REFRESH)
      throw new BadRequestException('The type of token is not refresh');

    const payload = { id: tokenPayload.id, token_type: JwtType.ACCESS };

    return this.jwtService.sign(payload);
  }
}

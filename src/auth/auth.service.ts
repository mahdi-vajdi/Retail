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
import { User } from 'src/users/schemas/user.schema';

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

  signin(user: User): { access_token: string } {
    const payload = {
      phone: user.phone,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token);
    const user = this.usersService.findOne(decoded.phone);
    if (!user) throw new Error('Unable to get the user from decoded token');
    return user;
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

  async validate(phone: string, password: string): Promise<User> | null {
    const user = await this.usersService.findOne(phone);
    if (!user) return null;

    const passwordIsValid = await bcrypt.compare(password, user.password);
    return passwordIsValid ? user : null;
  }
}

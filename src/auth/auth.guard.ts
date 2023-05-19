import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/roles/roles.enum';
import { ROLES_KEY } from '../users/roles/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/jwt/jwt.interface';
import { JwtType } from 'src/auth/jwt/jwt.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Get the required roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || !requiredRoles.length) return true;

    // Get the token
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new UnauthorizedException();

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (payload.token_type != JwtType.ACCESS)
      throw new BadRequestException('The provided token is not type access');

    const user = await this.userModel.findById(payload.id);
    if (!user) return false;
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

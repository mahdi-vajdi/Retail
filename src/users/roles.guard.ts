import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from './roles/roles.enum';
import { ROLES_KEY } from './roles/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Get the required roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Required Roles: ', requiredRoles);
    if (!requiredRoles || !requiredRoles.length) return true;

    // Get the token
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new UnauthorizedException();

    let payload;

    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.userModel.findById(payload['sub']);
    if (!user) return false;
    console.log('user roles: ', user.roles);
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const UserDec = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as User;
  },
);

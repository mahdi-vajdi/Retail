import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);

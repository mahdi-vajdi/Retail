import { Expose } from 'class-transformer';
import { Role } from '../roles/roles.enum';

export class UserResponseDto {
  @Expose()
  phone: string;

  @Expose()
  roles: Role[];
}

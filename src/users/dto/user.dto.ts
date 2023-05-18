import { Expose } from 'class-transformer';
import { Role } from '../roles/roles.enum';

export class UserDto {
  @Expose()
  phone: string;

  @Expose()
  roles: Role[];
}

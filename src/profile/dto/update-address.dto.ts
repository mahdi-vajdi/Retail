import { CreateAddressDto } from './create-address.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDto extends CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  addressId: string;
}

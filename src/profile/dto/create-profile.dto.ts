import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { Address } from './address.dto';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsArray()
  addresses: Address[];
}

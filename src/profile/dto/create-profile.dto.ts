import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { last } from 'rxjs';

export class CreateProfileDto {
  @IsString()
  user: string;

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
  @IsOptional()
  adresses: {
    country: string;
    city: string;
    street: string;
    number: string;
    zip: string;
  }[];

  constructor(user: string) {
    this.user = user;
  }
}

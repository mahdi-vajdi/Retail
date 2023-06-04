import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}

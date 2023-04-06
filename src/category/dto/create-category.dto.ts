import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public color: string;

  @IsString()
  @IsNotEmpty()
  public icon: string;

  @IsString()
  @IsNotEmpty()
  public image: string;
}

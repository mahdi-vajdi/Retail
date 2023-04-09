import { Category } from 'src/category/schemas/category.schema';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public richDescription: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  public images: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public brand: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNotEmpty()
  public category: Category;

  @IsNumber()
  @IsNotEmpty()
  public countInStock: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public rating: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public numReviews: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public isFeatured: boolean;

  @IsNotEmpty()
  @IsOptional()
  public dateCreated: Date;
}

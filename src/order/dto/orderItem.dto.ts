import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}

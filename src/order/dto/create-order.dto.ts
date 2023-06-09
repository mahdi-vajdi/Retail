import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../profile/dto/create-address.dto';
import { OrderItem } from '../schemas/order.schema';
import { Type } from 'class-transformer';
import { OrderItemDto } from './orderItem.dto';

export class CreateOrderDto {
  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  orderItems: OrderItem[];

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  shippingAddress: CreateAddressDto;
}

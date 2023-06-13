import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { Address } from '../../profile/schemas/address.schema';
import mongoose from 'mongoose';
import { OrderItem, OrderItemSchema } from './ordetItem.schema';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
  CANCELED = 'canceled',
}

@Schema()
export class Order {
  @Prop({ required: true, type: [OrderItemSchema] })
  orderItems: OrderItem[];

  @Prop({
    required: true,
    type: Address,
  })
  shippingAddress: Address;

  @Prop({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  subTotal: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  dateOrderd: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export { OrderItem };

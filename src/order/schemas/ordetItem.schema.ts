import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

@Schema({ _id: false })
export class OrderItem {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: Product;

  @Prop({ required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

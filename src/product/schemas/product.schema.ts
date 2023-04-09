import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, Date, HydratedDocument } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  richDescription: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: '' })
  brand: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, min: 0 })
  countInStock: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  numReviews: number;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: Date, default: now() })
  dateCreated: Date;
}

export const productSchema = SchemaFactory.createForClass(Product);

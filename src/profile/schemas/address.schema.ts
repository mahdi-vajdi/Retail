import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  id?: string; // This is for returned document from db

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  zip: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);

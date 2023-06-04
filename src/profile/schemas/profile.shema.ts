import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Address, addressSchema } from './address.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ type: [addressSchema] })
  addresses: Address[];
}

export const profileSchema = SchemaFactory.createForClass(Profile);

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

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

  @Prop(
    raw({
      country: { type: String, default: '' },
      city: { type: String, default: '' },
      street: { type: String, default: '' },
      number: { type: String, default: '' },
      zip: { type: String, default: '' },
    }),
  )
  adresses: {
    country: string;
    city: string;
    street: string;
    number: string;
    zip: string;
  }[];
}

export const profileSchema = SchemaFactory.createForClass(Profile);

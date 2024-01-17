import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'Products', timestamps: false, _id: false })
export class Product {
  @Prop({
    type: Number,
    unique: true,
  })
  id: number;

  @Prop({
    type: String,
  })
  offer_id: string;

  @Prop({
    type: Number,
  })
  price?: number;

  @Prop({
    type: Number,
    default: 0,
  })
  action_price: number;

  @Prop({
    type: Number,
  })
  max_action_price: number;

  @Prop({
    type: String,
  })
  add_mode?: string;

  @Prop({
    type: Number,
    default: 0,
  })
  min_stock: number;

  @Prop({
    type: Number,
    default: 0,
  })
  stock: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_action?: boolean;

  @Prop({
    type: String,
  })
  date_day_promo?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

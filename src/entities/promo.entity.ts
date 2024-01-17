import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.entity';

export type PromoDocument = HydratedDocument<Promo>;

@Schema({ collection: 'Promos', timestamps: false, _id: false })
export class Promo {
  @Prop({
    type: Number,
    unique: true,
  })
  id: number;

  @Prop({
    type: Number,
    default: null,
  })
  hotsale_id?: number;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  date_start: string;

  @Prop({
    type: String,
  })
  date_end: string;

  @Prop({
    type: String,
  })
  freeze_date: string;

  @Prop({
    type: Number,
    default: 0,
  })
  potential_products_count?: number;

  @Prop({
    type: Number,
    default: 0,
  })
  participating_products_count?: number;

  @Prop({
    type: Boolean,
  })
  is_participating: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  is_voucher_action?: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  banned_products_count?: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  with_targeting?: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  order_amount?: number;

  @Prop({
    type: String,
    default: 'UNKNOWN',
  })
  discount_type?: string;

  @Prop({
    type: Number,
    default: 0,
  })
  discount_value?: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_hotsale?: boolean;

  @Prop({
    type: [Types.ObjectId],
    ref: Product.name,
    default: [],
  })
  products?: Product[];
}

export const PromoSchema = SchemaFactory.createForClass(Promo);

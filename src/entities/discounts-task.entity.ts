import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscountsTaskDocument = HydratedDocument<DiscountsTask>;

@Schema({ collection: 'DiscountsTasks', timestamps: false })
export class DiscountsTask {
  @Prop({
    type: Number,
    unique: true,
  })
  id: number;

  @Prop({
    type: Date,
  })
  created_at: Date;

  @Prop({
    type: Date,
  })
  end_at: Date;

  @Prop({
    type: Date,
  })
  edited_till: Date;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: String,
  })
  customer_name: string;

  @Prop({
    type: Number,
  })
  sku: number;

  @Prop({
    type: String,
  })
  user_comment: string;

  @Prop({
    type: String,
  })
  seller_comment: string;

  @Prop({
    type: Number,
  })
  requested_price: number;

  @Prop({
    type: Number,
  })
  approved_price: number;

  @Prop({
    type: Number,
  })
  original_price: number;

  @Prop({
    type: Number,
  })
  discount: number;

  @Prop({
    type: Number,
  })
  discount_percent: number;

  @Prop({
    type: Number,
  })
  base_price: number;

  @Prop({
    type: Number,
  })
  min_auto_price: number;

  @Prop({
    type: Number,
  })
  prev_task_id: number;

  @Prop({
    type: Boolean,
  })
  is_damaged: boolean;

  @Prop({
    type: Number,
  })
  moderated_at: Date;

  @Prop({
    type: Number,
  })
  approved_discount: number;

  @Prop({
    type: Number,
  })
  approved_discount_percent: number;

  @Prop({
    type: Boolean,
  })
  is_purchased: boolean;

  @Prop({
    type: Boolean,
  })
  is_auto_moderated: boolean;

  @Prop({
    type: String,
  })
  offer_id: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  first_name: string;

  @Prop({
    type: String,
  })
  last_name: string;

  @Prop({
    type: String,
  })
  patronymic: string;

  @Prop({
    type: Number,
  })
  approved_quantity_min: number;

  @Prop({
    type: Number,
  })
  approved_quantity_max: number;

  @Prop({
    type: Number,
  })
  requested_quantity_min: number;

  @Prop({
    type: Number,
  })
  requested_quantity_msx: number;

  @Prop({
    type: Number,
  })
  requested_price_with_fee: number;

  @Prop({
    type: Number,
  })
  approved_price_with_fee: number;

  @Prop({
    type: Number,
  })
  approved_price_fee_percent: number;
}

export const DiscountsTaskSchema = SchemaFactory.createForClass(DiscountsTask);

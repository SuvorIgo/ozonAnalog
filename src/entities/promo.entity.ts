import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PromoDocument = HydratedDocument<Promo>;

@Schema({ collection: 'Promos', timestamps: false })
export class Promo {
    @Prop({ 
        type: Number,
        unique: true,
    })
    id: number;

    @Prop({ 
        type: String,
    })
    title: string;

    @Prop({ 
        type: String,
    })
    description: string;

    @Prop({ 
        type: Date,
    })
    date_start: Date;

    @Prop({ 
        type: Date,
    })
    date_end: Date;

    @Prop({ 
        type: Date,
    })
    freeze_date: Date;

    @Prop({ 
        type: Number,
    })
    potential_products_count: number;

    @Prop({ 
        type: Number,
    })
    participating_products_count: number;

    @Prop({ 
        type: Boolean,
    })
    is_participating: boolean;

    @Prop({ 
        type: Boolean,
    })
    is_voucher_action: boolean;

    @Prop({ 
        type: Number,
    })
    banned_products_count: number;

    @Prop({ 
        type: Boolean,
    })
    with_targeting: boolean;

    @Prop({ 
        type: Number,
    })
    order_amount: number;

    @Prop({ 
        type: String,
    })
    discount_type: string;

    @Prop({ 
        type: Number,
    })
    discount_value: number;

    @Prop({ 
        type: Boolean,
        default: false
    })
    is_hotsale: boolean;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);
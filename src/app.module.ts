import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Promo, PromoSchema } from './entities/promo.entity';
import {
  DiscountsTask,
  DiscountsTaskSchema,
} from './entities/discounts-task.entity';
import { CustomDecoratorsValidationModule } from './decorators/validation/custom-decorators-validation.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/OzonAnalog'),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Promo.name, schema: PromoSchema },
      { name: DiscountsTask.name, schema: DiscountsTaskSchema },
    ]),
    forwardRef(() => CustomDecoratorsValidationModule),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

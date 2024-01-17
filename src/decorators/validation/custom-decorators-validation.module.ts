import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { IsExistPromoByIdConstraint } from './is-exist-promo-by-id.decorator';
import { IsPositiveNumberConstraint } from './is-positive-number.decorator';
import { IsCorrectArrayProductsConstraint } from './is-correct-array-products.decorator';
import { IsNumericArrayConstraint } from './is-numeric-array.decorator';
import { IsExistPromoHotsaleByIdConstraint } from './is-exist-promo-hotsale-by-id.decorator';
import { IsCorrectArrayTasksInCoordinateConstraint } from './is-correct-array-tasks-in-coordinate.decorator';
import { IsCorrectArrayTasksInRejectConstraint } from './is-correct-array-tasks-in-reject.decorator';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [
    IsExistPromoByIdConstraint,
    IsPositiveNumberConstraint,
    IsCorrectArrayProductsConstraint,
    IsNumericArrayConstraint,
    IsExistPromoHotsaleByIdConstraint,
    IsCorrectArrayTasksInCoordinateConstraint,
    IsCorrectArrayTasksInRejectConstraint,
  ],
})
export class CustomDecoratorsValidationModule {}

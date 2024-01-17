import { PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoHotsaleById } from 'src/decorators/validation/is-exist-promo-hotsale-by-id.decorator';
import { DeleteProductsInPromoDto } from './delete-products-in-promo.dto';

export class DeleteProductsInHotsalePromoDto extends PickType(
  DeleteProductsInPromoDto,
  ['product_ids'] as const,
) {
  @IsExistPromoHotsaleById({
    message: 'Акции Hotsale с таким id не существует',
  })
  @IsInt({ message: 'hotsale_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'hotsale_id не может быть пустым' })
  hotsale_id: number;
}

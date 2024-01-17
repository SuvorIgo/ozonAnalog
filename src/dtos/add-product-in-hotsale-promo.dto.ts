import { PickType } from '@nestjs/swagger';
import { AddProductInPromoDto } from './add-product-in-promo.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoHotsaleById } from 'src/decorators/validation/is-exist-promo-hotsale-by-id.decorator';

export class AddProductInHotsalePromoDto extends PickType(
  AddProductInPromoDto,
  ['products'] as const,
) {
  @IsExistPromoHotsaleById({
    message: 'Акции Hotsale с таким id не существует',
  })
  @IsInt({ message: 'hotsale_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'hotsale_id не может быть пустым' })
  hotsale_id: number;
}

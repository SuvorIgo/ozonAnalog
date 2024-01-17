import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoById } from '../decorators/validation/is-exist-promo-by-id.decorator';
import { IsCorrectArrayProducts } from 'src/decorators/validation/is-correct-array-products.decorator';

export class AddProductInPromoDto {
  @IsExistPromoById({ message: 'Акции с таким id не существует' })
  @IsInt({ message: 'action_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'action_id не может быть пустым' })
  action_id: number;

  @IsCorrectArrayProducts({
    message:
      'products должен быть валидным и содержать необходимое количество параметров в объекте',
  })
  @IsArray({ message: 'products должен быть массивом' })
  @IsNotEmpty({ message: 'products не может быть пустым' })
  products: Array<{
    product_id: number;
    action_price: number;
    stock: number;
  }>;
}

import { ArrayMinSize, IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoById } from 'src/decorators/validation/is-exist-promo-by-id.decorator';
import { IsNumericArray } from 'src/decorators/validation/is-numeric-array.decorator';

export class DeleteProductsInPromoDto {
  @IsExistPromoById({ message: 'Акции с таким id не существует' })
  @IsInt({ message: 'action_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'action_id не может быть пустым' })
  action_id: number;

  @IsNumericArray({
    message: 'product_ids должен состоять из целочисленных значений',
  })
  @ArrayMinSize(1, { message: 'product_ids не может быть пустым' })
  @IsArray({ message: 'product_ids должен быть массивом' })
  @IsNotEmpty({ message: 'product_ids не может быть пустым' })
  product_ids: number[];
}

import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoById } from 'src/decorators/validation/is-exist-promo-by-id.decorator';
import { IsPositiveNumber } from 'src/decorators/validation/is-positive-number.decorator';

export class GetListProductsAvailableForPromoDto {
  @IsExistPromoById({ message: 'Акции с таким id не существует' })
  @IsInt({ message: 'action_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'action_id не может быть пустым' })
  action_id: number;

  @IsPositiveNumber({
    message: 'limit должен быть положительным целочисленным значением',
  })
  @IsInt({ message: 'limit должен быть целочисленным значением' })
  limit?: number = 100;

  @IsPositiveNumber({
    message: 'offset должен быть положительным целочисленным значением',
  })
  @IsInt({ message: 'offset должен быть целочисленным значением' })
  offset?: number = 0;
}

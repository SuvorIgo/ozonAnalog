import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistPromoHotsaleById } from 'src/decorators/validation/is-exist-promo-hotsale-by-id.decorator';
import { IsPositiveNumber } from 'src/decorators/validation/is-positive-number.decorator';

export class GetListProductsParticipatingOnHotsalePromoDto {
  @IsExistPromoHotsaleById({
    message: 'Акции Hotsale с таким id не существует',
  })
  @IsInt({ message: 'hotsale_id должен быть целочисленным значением' })
  @IsNotEmpty({ message: 'hotsale_id не может быть пустым' })
  hotsale_id: number;

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

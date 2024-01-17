import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsPositiveNumber } from 'src/decorators/validation/is-positive-number.decorator';

export enum StatusEnum {
  UNKNOWN = null,
  NEW = 'новая',
  SEEN = 'просмотренная',
  APPROVED = 'одобренная',
  PARTLY_APPROVES = 'одобренная частично',
  DECLINED = 'отклоненная',
  AUTO_DECLINED = 'отклонена автоматически',
  DECLINED_BY_USER = 'отклонена покупателем',
  COUPON = 'скидка по купону',
  PURCHASED = 'купленная',
}

export class GetListDiscountRequestsDto {
  @IsIn(Object.keys(StatusEnum), {
    message:
      'status нельзя передать с таким значеним. Возможные значения: UNKNOWN, NEW, SEEN, APPROVED, PARTLY_APPROVED, DECLINED, AUTO_DECLINED, DECLINED_BY_USER, COUPON, PURCHASED',
  })
  @IsString({ message: 'status должен быть строковым значением' })
  @IsNotEmpty({ message: 'status не может быть пустым' })
  status: StatusEnum;

  @IsPositiveNumber({
    message: 'page должен быть положительным целочисленным значением',
  })
  @IsInt({ message: 'page должен быть целочисленным значением' })
  page?: number = 1;

  @IsPositiveNumber({
    message: 'limit должен быть положительным целочисленным значением',
  })
  @IsInt({ message: 'limit должен быть целочисленным значением' })
  limit?: number = 10;
}

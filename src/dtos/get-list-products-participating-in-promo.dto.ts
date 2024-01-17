import { PartialType } from '@nestjs/swagger';
import { GetListProductsAvailableForPromoDto } from './get-list-products-available-for-promo.dto';

export class GetListProductsParticipatingInPromo extends PartialType(
  GetListProductsAvailableForPromoDto,
) {}

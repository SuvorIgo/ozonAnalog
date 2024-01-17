import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Promo } from './entities/promo.entity';
import { Product } from './entities/product.entity';
import { GetListProductsAvailableForPromoDto } from './dtos/get-list-products-available-for-promo.dto';
import { GetListProductsParticipatingInPromo } from './dtos/get-list-products-participating-in-promo.dto';
import { AddProductInPromoDto } from './dtos/add-product-in-promo.dto';
import { GetListProductsParticipatingOnHotsalePromoDto } from './dtos/get-list-products-participating-on-hotsale-promo.dto';
import { AddProductInHotsalePromoDto } from './dtos/add-product-in-hotsale-promo.dto';
import { DeleteProductsInPromoDto } from './dtos/delete-products-in-promo.dto';
import { DeleteProductsInHotsalePromoDto } from './dtos/delete-products-in-hotsale-promo.dto';
import { DiscountsTask } from './entities/discounts-task.entity';
import { GetListDiscountRequestsDto } from './dtos/get-list-discount-requests.dto';
import { CoordinateApplicationForDiscountDto } from './dtos/coordinate-application-for-discount.dto';
import { RejectDiscountRequestDto } from './dtos/reject-discount-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get('/actions')
  async getActions(): Promise<{ result: Promo[] }> {
    return await this.appService.getActions();
  }

  @Version('1')
  @Post('/actions/candidates')
  async getListProductsAvailableForPromo(
    @Body() payload: GetListProductsAvailableForPromoDto,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    return await this.appService.getListProductsAvailableForPromo(payload);
  }

  @Version('1')
  @Post('/actions/products')
  async getListProductsParticipatingInPromo(
    @Body() payload: GetListProductsParticipatingInPromo,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    return await this.appService.getListProductsParticipatingInPromo(payload);
  }

  @Version('1')
  @Post('/actions/products/activate')
  async addProductInPromo(@Body() payload: AddProductInPromoDto): Promise<{
    result: {
      product_ids: number[];
      rejected: Array<{ product_id: number; reason: string }>;
    };
  }> {
    return await this.appService.addProductInPromo(payload);
  }

  @Version('1')
  @Post('/actions/products/deactivate')
  async deleteProductsInPromo(
    @Body() payload: DeleteProductsInPromoDto,
  ): Promise<{
    result: {
      product_ids: number[];
      rejected: Array<{ product_id: number; reason: string }>;
    };
  }> {
    return await this.appService.deleteProductsInPromo(payload);
  }

  @Version('1')
  @Post('/actions/hotsales/list')
  async getListAvailableHotsalesPromos(): Promise<{
    result: Promo[];
  }> {
    return await this.appService.getListAvailableHotsalesPromos();
  }

  @Version('1')
  @Post('/actions/hotsales/products')
  async getListProductsParticipatingInHotsalePromo(
    @Body() payload: GetListProductsParticipatingOnHotsalePromoDto,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    return await this.appService.getListProductsParticipatingInHotsalePromo(
      payload,
    );
  }

  @Version('1')
  @Post('/actions/hotsales/activate')
  async addProductInHotsalePromo(
    @Body() payload: AddProductInHotsalePromoDto,
  ): Promise<{
    result: {
      rejected: Array<{
        product_id: number;
        reason: string;
      }>;
    };
  }> {
    return await this.appService.addProductInHotsalePromo(payload);
  }

  @Version('1')
  @Post('/actions/hotsales/deactivate')
  async deleteProductsInHotsalePromo(
    @Body() payload: DeleteProductsInHotsalePromoDto,
  ): Promise<{
    result: {
      rejected: Array<{
        product_id: number;
        reason: string;
      }>;
    };
  }> {
    return await this.appService.deleteProductsInHotsalePromo(payload);
  }

  @Version('1')
  @Post('/actions/discounts-task/list')
  async getListDiscountRequests(
    @Body() payload: GetListDiscountRequestsDto,
  ): Promise<{
    result: DiscountsTask[];
  }> {
    return await this.appService.getListDiscountRequests(payload);
  }

  @Version('1')
  @Post('/actions/discounts-task/approve')
  async coordinateApplicationForDiscount(
    @Body() payload: CoordinateApplicationForDiscountDto,
  ): Promise<{
    result: {
      fail_details: Array<{
        task_id: number;
        error_for_user: string;
      }>;
      success_count: number;
      fail_count: number;
    };
  }> {
    return await this.appService.coordinateApplicationForDiscount(payload);
  }

  @Version('1')
  @Post('/actions/discounts-task/decline')
  async rejectDiscountRequest(
    @Body() payload: RejectDiscountRequestDto,
  ): Promise<{
    result: {
      fail_details: Array<{
        task_id: number;
        error_for_user: string;
      }>;
      success_count: number;
      fail_count: number;
    };
  }> {
    return await this.appService.rejectDiscountRequest(payload);
  }
}

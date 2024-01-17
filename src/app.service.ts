import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Promo } from './entities/promo.entity';
import { Model } from 'mongoose';
import { GetListProductsAvailableForPromoDto } from './dtos/get-list-products-available-for-promo.dto';
import { Product } from './entities/product.entity';
import { GetListProductsParticipatingInPromo } from './dtos/get-list-products-participating-in-promo.dto';
import { AddProductInPromoDto } from './dtos/add-product-in-promo.dto';
import { DeleteProductsInPromoDto } from './dtos/delete-products-in-promo.dto';
import { GetListProductsParticipatingOnHotsalePromoDto } from './dtos/get-list-products-participating-on-hotsale-promo.dto';
import { AddProductInHotsalePromoDto } from './dtos/add-product-in-hotsale-promo.dto';
import { DeleteProductsInHotsalePromoDto } from './dtos/delete-products-in-hotsale-promo.dto';
import {
  GetListDiscountRequestsDto,
  StatusEnum,
} from './dtos/get-list-discount-requests.dto';
import { DiscountsTask } from './entities/discounts-task.entity';
import { CoordinateApplicationForDiscountDto } from './dtos/coordinate-application-for-discount.dto';
import { RejectDiscountRequestDto } from './dtos/reject-discount-request.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Promo.name)
    private PromoRepository: Model<Promo>,
    @InjectModel(Product.name)
    private ProductRepository: Model<Product>,
    @InjectModel(DiscountsTask.name)
    private DiscountsTaskRepository: Model<DiscountsTask>,
  ) {}

  async getActions(): Promise<{ result: Promo[] }> {
    const promos = await this.PromoRepository.find(
      {
        hotsale_id: null,
        is_hotsale: false,
      },
      {
        _id: false,
        hotsale_id: false,
        is_hotsale: false,
        products: false,
      },
    );

    return {
      result: promos,
    };
  }

  async getListProductsAvailableForPromo(
    payload: GetListProductsAvailableForPromoDto,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    const products = await this.ProductRepository.find(
      { is_action: false },
      {
        _id: false,
        id: true,
        price: true,
        action_price: true,
        max_action_price: true,
        add_mode: true,
        min_stock: true,
        stock: true,
      },
    )
      .skip(payload.offset)
      .limit(payload.limit);

    return {
      result: {
        products: products,
        total: products.length,
      },
    };
  }

  async getListProductsParticipatingInPromo(
    payload: GetListProductsParticipatingInPromo,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    const promo = await this.getPromoById(payload.action_id);

    const products = promo.products?.slice(
      payload.offset,
      payload.limit + payload.offset,
    );

    return {
      result: {
        products: products,
        total: products.length,
      },
    };
  }

  async addProductInPromo(payload: AddProductInPromoDto): Promise<{
    result: {
      product_ids: number[];
      rejected: Array<{ product_id: number; reason: string }>;
    };
  }> {
    const promo = await this.getPromoById(payload.action_id);

    const newArrayIdsProducts = payload.products.map((item) => item.product_id);

    if ([...new Set(newArrayIdsProducts)].length !== newArrayIdsProducts.length)
      throw new HttpException(
        'Массив products не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    const correctArrayProducts = new Array<number>();
    const incorrectArrayProducts = new Array<{
      product_id: number;
      reason: string;
    }>();

    for (let i = 0; i < newArrayIdsProducts.length; i++) {
      const currentProductId = newArrayIdsProducts[i];

      const newCurrentProduct = payload.products.find(
        (product) => product.product_id == currentProductId,
      );
      const currentProduct = await this.getProductById(currentProductId);

      if (!currentProduct) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товара с таким id не существует',
        });
        continue;
      }

      if (newCurrentProduct.action_price <= 0) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'action_price не может быть меньше или равно 0',
        });
        continue;
      }

      if (newCurrentProduct.action_price > currentProduct.max_action_price) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'action_price не может быть больше max_action_price',
        });
        continue;
      }

      if (newCurrentProduct.stock <= 0) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'stock не может быть меньше или равно 0',
        });
        continue;
      }

      if (newCurrentProduct.stock <= currentProduct.min_stock) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'stock не может быть меньше min_stock',
        });
        continue;
      }

      if (currentProduct.is_action) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товар не может быть добавлен, так как состоит в акции',
        });
        continue;
      }

      currentProduct.action_price = newCurrentProduct.action_price;
      currentProduct.stock = newCurrentProduct.stock;
      currentProduct.is_action = true;

      correctArrayProducts.push(currentProduct.id);

      await this.updateProductByProduct(currentProduct);
      await this.addProductInPromoByProduct(promo.id, currentProduct);
    }

    return {
      result: {
        product_ids: correctArrayProducts,
        rejected: incorrectArrayProducts,
      },
    };
  }

  async deleteProductsInPromo(payload: DeleteProductsInPromoDto): Promise<{
    result: {
      product_ids: number[];
      rejected: Array<{ product_id: number; reason: string }>;
    };
  }> {
    const promo = await this.getPromoById(payload.action_id);

    const deleteArrayIdsProducts = payload.product_ids;

    if (
      [...new Set(deleteArrayIdsProducts)].length !==
      deleteArrayIdsProducts.length
    )
      throw new HttpException(
        'Массив product_ids не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    const correctArrayProducts = new Array<number>();
    const incorrectArrayProducts = new Array<{
      product_id: number;
      reason: string;
    }>();

    for (let i = 0; i < deleteArrayIdsProducts.length; i++) {
      const currentProductId = deleteArrayIdsProducts[i];

      const currentProduct = await this.getProductById(currentProductId);

      if (!currentProduct) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товара с таким id не существует',
        });
        continue;
      }

      if (!currentProduct.is_action) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason:
            'Товар не может быть удален из акции, так как не состоит в акции',
        });
        continue;
      }

      if (
        !promo.products.map((product) => product.id).includes(currentProduct.id)
      ) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason:
            'Товар не может быть удален из акции, так как не состоит в этой акции',
        });
        continue;
      }

      currentProduct.action_price = 0;
      currentProduct.stock = 0;
      currentProduct.is_action = false;

      correctArrayProducts.push(currentProduct.id);

      await this.updateProductByProduct(currentProduct);
      await this.deleteProductInPromoByProductId(promo.id, currentProduct.id);
    }

    return {
      result: {
        product_ids: correctArrayProducts,
        rejected: incorrectArrayProducts,
      },
    };
  }

  async getListAvailableHotsalesPromos(): Promise<{
    result: Promo[];
  }> {
    const hotsalePromos = await this.PromoRepository.find(
      {
        is_hotsale: true,
      },
      {
        _id: false,
        date_end: true,
        date_start: true,
        description: true,
        freeze_date: true,
        hotsale_id: true,
        is_participating: true,
        title: true,
      },
    );

    return {
      result: hotsalePromos,
    };
  }

  async getListProductsParticipatingInHotsalePromo(
    payload: GetListProductsParticipatingOnHotsalePromoDto,
  ): Promise<{
    result: {
      products: Product[];
      total: number;
    };
  }> {
    const products = await this.ProductRepository.find(
      { is_action: false },
      {
        _id: false,
        id: true,
        action_price: true,
        max_action_price: true,
        min_stock: true,
        stock: true,
        date_day_promo: true,
        is_action: true,
      },
    )
      .skip(payload.offset)
      .limit(payload.limit);

    return {
      result: {
        products: products,
        total: products.length,
      },
    };
  }

  async addProductInHotsalePromo(
    payload: AddProductInHotsalePromoDto,
  ): Promise<{
    result: {
      rejected: Array<{
        product_id: number;
        reason: string;
      }>;
    };
  }> {
    const promo = await this.getPromoHotsaleById(payload.hotsale_id);

    const newArrayIdsProducts = payload.products.map((item) => item.product_id);

    if ([...new Set(newArrayIdsProducts)].length !== newArrayIdsProducts.length)
      throw new HttpException(
        'Массив products не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    const incorrectArrayProducts = new Array<{
      product_id: number;
      reason: string;
    }>();

    for (let i = 0; i < newArrayIdsProducts.length; i++) {
      const currentProductId = newArrayIdsProducts[i];

      const newCurrentProduct = payload.products.find(
        (product) => product.product_id == currentProductId,
      );
      const currentProduct = await this.getProductById(currentProductId);

      if (!currentProduct) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товара с таким id не существует',
        });
        continue;
      }

      if (newCurrentProduct.action_price <= 0) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'action_price не может быть меньше или равно 0',
        });
        continue;
      }

      if (newCurrentProduct.action_price > currentProduct.max_action_price) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'action_price не может быть больше max_action_price',
        });
        continue;
      }

      if (newCurrentProduct.stock <= 0) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'stock не может быть меньше или равно 0',
        });
        continue;
      }

      if (newCurrentProduct.stock <= currentProduct.min_stock) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'stock не может быть меньше min_stock',
        });
        continue;
      }

      if (currentProduct.is_action) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товар не может быть добавлен, так как состоит в акции',
        });
        continue;
      }

      currentProduct.action_price = newCurrentProduct.action_price;
      currentProduct.stock = newCurrentProduct.stock;
      currentProduct.is_action = true;

      await this.updateProductByProduct(currentProduct);
      await this.addProductInPromoHotsaleByProduct(
        promo.hotsale_id,
        currentProduct,
      );
    }

    return {
      result: {
        rejected: incorrectArrayProducts,
      },
    };
  }

  async deleteProductsInHotsalePromo(
    payload: DeleteProductsInHotsalePromoDto,
  ): Promise<{
    result: {
      rejected: Array<{
        product_id: number;
        reason: string;
      }>;
    };
  }> {
    const promo = await this.getPromoHotsaleById(payload.hotsale_id);

    const deleteArrayIdsProducts = payload.product_ids;

    if (
      [...new Set(deleteArrayIdsProducts)].length !==
      deleteArrayIdsProducts.length
    )
      throw new HttpException(
        'Массив product_ids не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    const incorrectArrayProducts = new Array<{
      product_id: number;
      reason: string;
    }>();

    for (let i = 0; i < deleteArrayIdsProducts.length; i++) {
      const currentProductId = deleteArrayIdsProducts[i];

      const currentProduct = await this.getProductById(currentProductId);

      if (!currentProduct) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason: 'Товара с таким id не существует',
        });
        continue;
      }

      if (!currentProduct.is_action) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason:
            'Товар не может быть удален из акции, так как не состоит в акциях',
        });
        continue;
      }

      if (
        !promo.products.map((product) => product.id).includes(currentProduct.id)
      ) {
        incorrectArrayProducts.push({
          product_id: currentProductId,
          reason:
            'Товар не может быть удален из акции, так как не состоит в этой акции',
        });
        continue;
      }

      currentProduct.action_price = 0;
      currentProduct.stock = 0;
      currentProduct.is_action = false;

      await this.updateProductByProduct(currentProduct);
      await this.deleteProductInPromoHotsaleByProductId(
        promo.hotsale_id,
        currentProduct.id,
      );
    }

    return {
      result: {
        rejected: incorrectArrayProducts,
      },
    };
  }

  async getListDiscountRequests(payload: GetListDiscountRequestsDto): Promise<{
    result: DiscountsTask[];
  }> {
    const paramsQuery =
      StatusEnum[payload.status] == null
        ? {}
        : { status: StatusEnum[payload.status] };

    const discountsTasks = await this.DiscountsTaskRepository.find(
      paramsQuery,
      {
        _id: false,
      },
    )
      .skip(payload.page == 1 ? 0 : (payload.page - 1) * payload.limit)
      .limit(payload.limit);

    return {
      result: discountsTasks,
    };
  }

  async coordinateApplicationForDiscount(
    payload: CoordinateApplicationForDiscountDto,
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
    const newDiscountsTasksIds = payload.tasks.map((task) => task.id);

    const correctArrayDiscountsTasks = new Array<DiscountsTask>();
    const incorrectArrayDiscountsTasks = new Array<{
      task_id: number;
      error_for_user: string;
    }>();

    if (
      [...new Set(newDiscountsTasksIds)].length !== newDiscountsTasksIds.length
    )
      throw new HttpException(
        'Массив tasks не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    for (let i = 0; i < newDiscountsTasksIds.length; i++) {
      const currentDiscountsTaskId = newDiscountsTasksIds[i];

      const updatedDataOfDiscountsTasks = payload.tasks.find(
        (task) => task.id == currentDiscountsTaskId,
      );

      const currentDiscountsTask = await this.getDiscountsTaskById(
        currentDiscountsTaskId,
      );

      if (!currentDiscountsTask) {
        incorrectArrayDiscountsTasks.push({
          task_id: currentDiscountsTaskId,
          error_for_user: 'Заявки с таким id не существует',
        });
        continue;
      }

      if (
        ![StatusEnum.NEW, StatusEnum.SEEN].includes(
          StatusEnum[currentDiscountsTask.status],
        )
      ) {
        incorrectArrayDiscountsTasks.push({
          task_id: currentDiscountsTaskId,
          error_for_user:
            'У заявки нельзя поменять статус, так как status не равен "новая" или "просмотренная"',
        });
        continue;
      }

      if (
        updatedDataOfDiscountsTasks.approved_quantity_min >
        updatedDataOfDiscountsTasks.approved_quantity_max
      ) {
        incorrectArrayDiscountsTasks.push({
          task_id: currentDiscountsTaskId,
          error_for_user:
            'approved_quantity_min не можеть быть больше approved_quantity_max',
        });
        continue;
      }

      currentDiscountsTask.approved_price =
        updatedDataOfDiscountsTasks.approved_price;
      currentDiscountsTask.seller_comment =
        updatedDataOfDiscountsTasks.seller_comment;
      currentDiscountsTask.approved_quantity_min =
        updatedDataOfDiscountsTasks.approved_quantity_min;
      currentDiscountsTask.approved_quantity_max =
        updatedDataOfDiscountsTasks.approved_quantity_max;
      currentDiscountsTask.status = StatusEnum.APPROVED;

      correctArrayDiscountsTasks.push(currentDiscountsTask);

      await this.updateDiscountsTaskByDiscountsTask(currentDiscountsTask);
    }

    return {
      result: {
        fail_details: incorrectArrayDiscountsTasks,
        success_count: correctArrayDiscountsTasks.length,
        fail_count: incorrectArrayDiscountsTasks.length,
      },
    };
  }

  async rejectDiscountRequest(payload: RejectDiscountRequestDto): Promise<{
    result: {
      fail_details: Array<{
        task_id: number;
        error_for_user: string;
      }>;
      success_count: number;
      fail_count: number;
    };
  }> {
    const rejectedDiscountsTasksIds = payload.tasks.map((task) => task.id);

    const correctArrayDiscountsTasks = new Array<DiscountsTask>();
    const incorrectArrayDiscountsTasks = new Array<{
      task_id: number;
      error_for_user: string;
    }>();

    if (
      [...new Set(rejectedDiscountsTasksIds)].length !==
      rejectedDiscountsTasksIds.length
    )
      throw new HttpException(
        'Массив tasks не должен содержать в себе повторяющиеся значения',
        HttpStatus.BAD_REQUEST,
      );

    for (let i = 0; i < rejectedDiscountsTasksIds.length; i++) {
      const currentDiscountsTaskId = rejectedDiscountsTasksIds[i];

      const rejectedDataOfDiscountsTasks = payload.tasks.find(
        (task) => task.id == currentDiscountsTaskId,
      );

      const currentDiscountsTask = await this.getDiscountsTaskById(
        currentDiscountsTaskId,
      );
      console.log(currentDiscountsTask);
      console.log(
        [StatusEnum.NEW, StatusEnum.SEEN].includes(currentDiscountsTask.status),
      );
      console.log([StatusEnum.NEW, StatusEnum.SEEN]);
      console.log(StatusEnum[currentDiscountsTask.status]);

      if (!currentDiscountsTask) {
        incorrectArrayDiscountsTasks.push({
          task_id: currentDiscountsTaskId,
          error_for_user: 'Заявки с таким id не существует',
        });
        continue;
      }

      if (
        ![StatusEnum.NEW, StatusEnum.SEEN].includes(
          StatusEnum[currentDiscountsTask.status],
        )
      ) {
        incorrectArrayDiscountsTasks.push({
          task_id: currentDiscountsTaskId,
          error_for_user:
            'У заявки нельзя поменять статус, так как status не равен "новая" или "просмотренная"',
        });
        continue;
      }

      currentDiscountsTask.approved_price = 0;
      currentDiscountsTask.seller_comment =
        rejectedDataOfDiscountsTasks.seller_comment;
      currentDiscountsTask.approved_quantity_min = 0;
      currentDiscountsTask.approved_quantity_max = 0;
      currentDiscountsTask.status = StatusEnum.DECLINED;

      correctArrayDiscountsTasks.push(currentDiscountsTask);

      await this.updateDiscountsTaskByDiscountsTask(currentDiscountsTask);
    }

    return {
      result: {
        fail_details: incorrectArrayDiscountsTasks,
        success_count: correctArrayDiscountsTasks.length,
        fail_count: incorrectArrayDiscountsTasks.length,
      },
    };
  }

  async getPromoById(id: number): Promise<Promo> {
    return await this.PromoRepository.findOne({ id: id, hotsale_id: null });
  }

  async getPromoHotsaleById(id: number): Promise<Promo> {
    return await this.PromoRepository.findOne({
      hotsale_id: id,
      is_hotsale: true,
    });
  }

  async getProductById(id: number): Promise<Product> {
    return await this.ProductRepository.findOne({ id: id });
  }

  async updateProductByProduct(updatedProduct: Product): Promise<Product> {
    const { id, ...updatedData } = updatedProduct;

    await this.ProductRepository.updateOne(
      { id },
      { $set: { ...updatedData } },
    );

    return updatedProduct;
  }

  async addProductInPromoByProduct(
    promoId: number,
    addedProduct: Product,
  ): Promise<Promo> {
    await this.PromoRepository.updateOne(
      { id: promoId },
      { $push: { products: addedProduct } },
    );

    return await this.getPromoById(promoId);
  }

  async addProductInPromoHotsaleByProduct(
    promoHotsaleId: number,
    addedProduct: Product,
  ): Promise<Promo> {
    await this.PromoRepository.updateOne(
      { hotsale_id: promoHotsaleId },
      { $push: { products: addedProduct } },
    );

    return await this.getPromoHotsaleById(promoHotsaleId);
  }

  async deleteProductInPromoByProductId(
    promoId: number,
    productId: number,
  ): Promise<Promo> {
    const promo = await this.getPromoById(promoId);

    await this.PromoRepository.updateOne(
      { id: promoId },
      {
        $pull: {
          products: promo.products.find((item) => item.id == productId),
        },
      },
    );

    return await this.getPromoById(promoId);
  }

  async deleteProductInPromoHotsaleByProductId(
    promoHotsaleId: number,
    productId: number,
  ): Promise<Promo> {
    const promo = await this.getPromoHotsaleById(promoHotsaleId);

    await this.PromoRepository.updateOne(
      { hotsale_id: promoHotsaleId },
      {
        $pull: {
          products: promo.products.find((item) => item.id == productId),
        },
      },
    );

    return await this.getPromoHotsaleById(promoHotsaleId);
  }

  async getDiscountsTaskById(id: number): Promise<DiscountsTask> {
    return await this.DiscountsTaskRepository.findOne({ id: id });
  }

  async updateDiscountsTaskByDiscountsTask(
    task: DiscountsTask,
  ): Promise<DiscountsTask> {
    const { id, ...updatedData } = task;

    await this.DiscountsTaskRepository.updateOne(
      { id: id },
      { $set: { ...updatedData } },
    );

    return await this.getDiscountsTaskById(id);
  }
}

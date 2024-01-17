import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCorrectArrayProducts', async: true })
export class IsCorrectArrayProductsConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (value.length == 0) return false;

    value.forEach((elem) => {
      if (elem.product_id === undefined)
        throw new HttpException(
          'Array products - object->product_id должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.product_id === null)
        throw new HttpException(
          'Array products - object->product_id не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.product_id != 'number')
        throw new HttpException(
          'Array products - object->product_id должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.action_price === undefined)
        throw new HttpException(
          'Array products - object->action_price должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.action_price === null)
        throw new HttpException(
          'Array products - object->action_price не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.action_price != 'number')
        throw new HttpException(
          'Array products - object->action_price должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.stock === undefined)
        throw new HttpException(
          'Array products - object->stock должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.stock === null)
        throw new HttpException(
          'Array products - object->stock не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.stock != 'number')
        throw new HttpException(
          'Array products - object->stock должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );
    });

    return true;
  }
}

export function IsCorrectArrayProducts(validationsOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationsOptions,
      constraints: [],
      validator: IsCorrectArrayProductsConstraint,
    });
  };
}

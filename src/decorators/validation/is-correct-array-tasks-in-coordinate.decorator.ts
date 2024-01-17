import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCorrectArrayTasksInCoordinate', async: true })
export class IsCorrectArrayTasksInCoordinateConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (value.length == 0) return false;

    value.forEach((elem) => {
      if (elem.id === undefined)
        throw new HttpException(
          'Array products - object->id должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.id === null)
        throw new HttpException(
          'Array products - object->id не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.id != 'number')
        throw new HttpException(
          'Array products - object->id должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.approved_price === undefined)
        throw new HttpException(
          'Array products - object->approved_price должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.approved_price === null)
        throw new HttpException(
          'Array products - object->approved_price не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.approved_price != 'number')
        throw new HttpException(
          'Array products - object->approved_price должен быть численным значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.seller_comment === undefined)
        throw new HttpException(
          'Array products - object->seller_comment должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.seller_comment === null)
        throw new HttpException(
          'Array products - object->seller_comment не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.seller_comment != 'string')
        throw new HttpException(
          'Array products - object->seller_comment должен быть строковым значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.approved_quantity_min === undefined)
        throw new HttpException(
          'Array products - object->approved_quantity_min должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.approved_quantity_min === null)
        throw new HttpException(
          'Array products - object->approved_quantity_min не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.approved_quantity_min != 'number')
        throw new HttpException(
          'Array products - object->approved_quantity_min должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );

      if (elem.approved_quantity_max === undefined)
        throw new HttpException(
          'Array products - object->approved_quantity_max должен быть задан',
          HttpStatus.BAD_REQUEST,
        );
      if (elem.approved_quantity_max === null)
        throw new HttpException(
          'Array products - object->approved_quantity_max не может быть равен null',
          HttpStatus.BAD_REQUEST,
        );
      if (typeof elem.approved_quantity_max != 'number')
        throw new HttpException(
          'Array products - object->approved_quantity_max должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );
    });

    return true;
  }
}

export function IsCorrectArrayTasksInCoordinate(
  validationsOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationsOptions,
      constraints: [],
      validator: IsCorrectArrayTasksInCoordinateConstraint,
    });
  };
}

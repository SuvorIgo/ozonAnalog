import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCorrectArrayTasksInReject', async: true })
export class IsCorrectArrayTasksInRejectConstraint
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
    });

    return true;
  }
}

export function IsCorrectArrayTasksInReject(
  validationsOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationsOptions,
      constraints: [],
      validator: IsCorrectArrayTasksInRejectConstraint,
    });
  };
}

import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { AppService } from '../../app.service';

@ValidatorConstraint({ name: 'IsExistPromoById', async: true })
export class IsExistPromoByIdConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly appService: AppService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (!(await this.appService.getPromoById(Number(value)))) return false;

    return true;
  }
}

export function IsExistPromoById(validationsOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationsOptions,
      constraints: [],
      validator: IsExistPromoByIdConstraint,
    });
  };
}

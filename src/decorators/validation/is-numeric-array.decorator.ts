import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNumericArray', async: true })
export class IsNumericArrayConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    let result = true;

    value.forEach((element) => {
      if (typeof element !== 'number') result = false;
    });

    return result;
  }
}

export function IsNumericArray(validationsOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationsOptions,
      constraints: [],
      validator: IsNumericArrayConstraint,
    });
  };
}

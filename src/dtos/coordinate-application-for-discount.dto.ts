import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { IsCorrectArrayTasksInCoordinate } from 'src/decorators/validation/is-correct-array-tasks-in-coordinate.decorator';

export class CoordinateApplicationForDiscountDto {
  @IsCorrectArrayTasksInCoordinate({ message: 'tasks невалиден' })
  @ArrayMinSize(1, {
    message: 'Array tasks должен содеражть как минимум одну запись',
  })
  @IsArray({ message: 'tasks должен быть массивом' })
  @IsNotEmpty({ message: 'tasks не должен быть пустьм' })
  tasks: {
    id: number;
    approved_price: number;
    seller_comment: string;
    approved_quantity_min: number;
    approved_quantity_max: number;
  }[];
}

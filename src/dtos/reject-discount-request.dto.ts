import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { IsCorrectArrayTasksInReject } from 'src/decorators/validation/is-correct-array-tasks-in-reject.decorator';

export class RejectDiscountRequestDto {
  @IsCorrectArrayTasksInReject({ message: 'tasks невалиден' })
  @ArrayMinSize(1, {
    message: 'Array tasks должен содеражть как минимум одну запись',
  })
  @IsArray({ message: 'tasks должен быть массивом' })
  @IsNotEmpty({ message: 'tasks не должен быть пустьм' })
  tasks: {
    id: number;
    seller_comment: string;
  }[];
}

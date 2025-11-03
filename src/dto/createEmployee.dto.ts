import { IsString, IsNotEmpty, MaxLength, IsNumber, IsPositive } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @IsPositive()
  departmentId: number;
}

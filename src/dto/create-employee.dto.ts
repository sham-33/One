import { IsString, IsNotEmpty, MaxLength, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John Doe', description: 'Employee name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 1, description: 'Department ID' })
  @IsNumber()
  @IsPositive()
  departmentId: number;
}

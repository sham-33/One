import { IsString, IsNumber, IsPositive, IsOptional, IsEmail } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsOptional() 
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  departmentId?: number;
}

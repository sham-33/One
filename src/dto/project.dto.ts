import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsOptional() 
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  employeeId?: number;
}

import { IsString, IsOptional } from 'class-validator';

export class DepartmentDto {
  @IsString()
  @IsOptional()
  name?: string;
}

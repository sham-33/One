import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import { DepartmentDto } from '../dto/department.dto';
import { Department } from '../entities/department.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post()
  create(@Body() departmentDto: DepartmentDto): Promise<Department> {
    return this.departmentsService.create(departmentDto);
  }

  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Get('employee-count')
  getEmployeeCount() {
    return this.departmentsService.getEmployeeCountByDepartment();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.update(+id, departmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.departmentsService.remove(+id);
  }
}

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
import { EmployeesService } from '../services/employees.service';
import { EmployeeDto } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeesService.create(employeeDto);
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get('with-department')
  findAllWithDepartment() {
    return this.employeesService.findAllWithDepartment();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() employeeDto: EmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.update(+id, employeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.employeesService.remove(+id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/createDepartment.dto';
import { UpdateDepartmentDto } from '../dto/updateDepartment.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }

  // JOIN Query: Count employees in each department
  async getEmployeeCountByDepartment(): Promise<
    Array<{ departmentId: number; departmentName: string; employeeCount: number }>
  > {
    const result = await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoin('department.employees', 'employee')
      .select('department.id', 'departmentId')
      .addSelect('department.name', 'departmentName')
      .addSelect('COUNT(employee.id)', 'employeeCount')
      .groupBy('department.id')
      .addGroupBy('department.name')
      .getRawMany();

    return result.map((row) => ({
      departmentId: row.departmentId,
      departmentName: row.departmentName,
      employeeCount: parseInt(row.employeeCount),
    }));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return await this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  // JOIN Query: Get all projects along with employee and department details
  async findAllWithDetails(): Promise<
    Array<{
      projectId: number;
      projectName: string;
      employeeId: number;
      employeeName: string;
      departmentId: number;
      departmentName: string;
    }>
  > {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.employee', 'employee')
      .leftJoinAndSelect('employee.department', 'department')
      .select([
        'project.id',
        'project.name',
        'employee.id',
        'employee.name',
        'department.id',
        'department.name',
      ])
      .getMany();

    return projects.map((project) => ({
      projectId: project.id,
      projectName: project.name,
      employeeId: project.employee?.id,
      employeeName: project.employee?.name,
      departmentId: project.employee?.department?.id,
      departmentName: project.employee?.department?.name,
    }));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(projectDto: ProjectDto): Promise<Project> {
    const project = this.projectRepository.create(projectDto);
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

  async update(id: number, projectDto: ProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, projectDto);
    return await this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

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

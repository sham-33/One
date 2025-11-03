import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './modules/departments.module';
import { EmployeesModule } from './modules/employees.module';
import { ProjectsModule } from './modules/projects.module';
import { Department } from './entities/department.entity';
import { Employee } from './entities/employee.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'shambutn',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'employee_management',
      entities: [Department, Employee, Project],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    DepartmentsModule,
    EmployeesModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

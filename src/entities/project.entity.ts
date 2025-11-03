import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'employee_id' })
  employeeId: number;

  @ManyToOne(() => Employee, (employee) => employee.projects)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}

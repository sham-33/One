# Employee-Department-Project Management System

A RESTful API built with NestJS, PostgreSQL, and TypeORM for managing employees, departments, and projects.

## Features

- ✅ CRUD operations for Departments, Employees, and Projects
- ✅ One-to-Many relationships (Department → Employees, Employee → Projects)
- ✅ TypeORM with PostgreSQL
- ✅ DTOs with validation using class-validator
- ✅ Advanced JOIN queries for reporting

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a PostgreSQL database:
```sql
CREATE DATABASE employee_management;
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your PostgreSQL credentials.

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Departments
- `GET /departments` - Get all departments
- `GET /departments/:id` - Get department by ID
- `POST /departments` - Create department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department
- `GET /departments/:id/employee-count` - Count employees in department

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `GET /employees/with-department` - Get all employees with department details
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /projects/with-details` - Get all projects with employee and department details
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## Database Schema

```
Department (1) ----< (N) Employee (1) ----< (N) Project
```

## Technologies Used

- NestJS 10.x
- TypeORM 0.3.x
- PostgreSQL
- class-validator
- class-transformer

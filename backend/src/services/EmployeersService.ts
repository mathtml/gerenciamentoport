import Employee from "../models/employees.js";

class EmployeeService {
  async getAllEmployees() {
    return Employee.findAll();
  }

  async getEmployeeById(id: number) {
    return Employee.findByPk(id);
  }

  async createEmployee(employeeData: {
    name: string;
    cpf: string;
    email: string;
    dateborn: string;
    location: string;
    cargo: string;
  }) {
    const { name, cpf, email, dateborn, location, cargo } = employeeData;

    if (!name || !cpf || !email || !dateborn || !location || !cargo) {
      throw new Error('All fields are required');
    }

    return Employee.create({
      name,
      cpf,
      email,
      dateborn,
      location,
      cargo
    });
  }

  async updateEmployee(id: number, employeeData: any) {
    const employee = await Employee.findByPk(id);
    if (employee) {
      return employee.update(employeeData);
    }
    throw new Error('Employee not found');
  }

  async deleteEmployee(id: number) {
    const employee = await Employee.findByPk(id);
    if (employee) {
      return employee.destroy();
    }
    throw new Error('Employee not found');
  }
}

export default new EmployeeService();

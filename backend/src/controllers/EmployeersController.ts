import { Request, Response } from 'express';
import EmployeeService from '../services/EmployeersService.js'; 

export const getAllEmployees = async (req: Request, res: Response): Promise<Response> => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    return res.json(employees);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: errorMessage });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const employee = await EmployeeService.getEmployeeById(Number(req.params.id));
    if (employee) {
      return res.json(employee);
    }
    return res.status(404).json({ message: 'Employee not found' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: errorMessage });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, cpf, email, dateborn, location, cargo } = req.body;

    if (!name || !cpf || !email || !dateborn || !location || !cargo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Cria um novo empregado
    const employee = await EmployeeService.createEmployee({
      name,
      cpf,
      email,
      dateborn,
      location,
      cargo
    });

    return res.status(201).json(employee);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: errorMessage });
  }
};
export const updateEmployee = async (req: Request, res: Response): Promise<Response> => {
  try {
    const employee = await EmployeeService.updateEmployee(Number(req.params.id), req.body);
    return res.json(employee);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: errorMessage });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<Response> => {
  try {
    await EmployeeService.deleteEmployee(Number(req.params.id));
    return res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: errorMessage });
  }
};

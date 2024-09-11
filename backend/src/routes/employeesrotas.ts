import { Router } from 'express';
import * as EmployeeController from '../controllers/EmployeersController.js';

const router = Router();

router.get('/show', EmployeeController.getAllEmployees);
router.get('/employees/:id', EmployeeController.getEmployeeById);
router.post('/create', EmployeeController.createEmployee);
router.put('/edit/:id', EmployeeController.updateEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);

export default router;

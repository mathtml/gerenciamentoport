import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeesrotas.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Usar employeeRoutes com a base /api/employees
app.use('/api/employees', employeeRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

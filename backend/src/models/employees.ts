import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../sequelize/index.js'; // Certifique-se de que o caminho está correto

class Employee extends Model {
  public id!: number;
  public name!: string;
  public cpf!: string;
  public email!: string;
  public dateborn!: string;
  public location!: string;
  public cargo!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateborn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'employees',
  timestamps: true, 
});

export default Employee;

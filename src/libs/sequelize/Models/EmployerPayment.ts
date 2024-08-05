// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class EmployerPayment extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

EmployerPayment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    employer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Employers",
        key: "id",
      },
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "EmployerPayment",
  }
);

export default EmployerPayment;

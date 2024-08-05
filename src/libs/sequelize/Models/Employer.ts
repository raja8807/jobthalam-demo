// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Employer extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

Employer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobs_pending: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Employer",
  }
);

export default Employer;

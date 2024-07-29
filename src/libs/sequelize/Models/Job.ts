// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Job extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    employer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Employers",
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Job",
    timestamps: true,
  }
);

export default Job;

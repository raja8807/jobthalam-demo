// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class AdminJob extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

AdminJob.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    company_name: {
      type: DataTypes.STRING,
    },
    company_phone_number: {
      type: DataTypes.STRING,
    },
    company_spoc_name: {
      type: DataTypes.STRING,
    },
    company_email: {
      type: DataTypes.STRING,
    },
    company_website: {
      type: DataTypes.STRING,
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
    is_free: {
      type: DataTypes.BOOLEAN,
    },
    is_admin_job: {
      type: DataTypes.BOOLEAN,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
    },
    duration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "AdminJob",
    timestamps: true,
  }
);

export default AdminJob;

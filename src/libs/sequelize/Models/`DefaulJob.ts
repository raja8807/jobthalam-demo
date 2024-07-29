// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class DefaultJob extends Model {}

DefaultJob.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "Jobs",
        key: "id",
      },
    },
    admin_job_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "AdminJobs",
        key: "id",
      },
    },
    employer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Employers",
        key: "id",
      },
    },

    skill: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },

    is_admin_job: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_free: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "DefaultJob",
    timestamps: true,
  }
);

export default DefaultJob;

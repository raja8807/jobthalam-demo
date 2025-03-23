// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import AdminJob from "./AdminJob";

class InternshipSubmission extends Model {}

InternshipSubmission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // job_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   defaultValue: null,
    //   references: {
    //     model: "Jobs",
    //     key: "id",
    //   },
    // },
    admin_job_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "AdminJobs",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "InternshipSubmission",
    timestamps: true,
  }
);

InternshipSubmission.belongsTo(AdminJob, {
  foreignKey: "admin_job_id",
});

export default InternshipSubmission;

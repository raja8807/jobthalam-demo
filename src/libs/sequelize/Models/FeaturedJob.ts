// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class FeaturedJob extends Model {}

FeaturedJob.init(
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
   
    request_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Requests",
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
    candidate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Candidates",
        key: "id",
      },
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_admin_job: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "FeaturedJob",
    timestamps: true,
  }
);

export default FeaturedJob;

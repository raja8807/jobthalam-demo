// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Application extends Model {
  public id!: number;
}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    candidate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Candidates",
        key: "id",
      },
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
    featured_job_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "FeaturedJobs",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Applied",
    },
  },
  {
    sequelize,
    modelName: "Application",
  }
);

export default Application;

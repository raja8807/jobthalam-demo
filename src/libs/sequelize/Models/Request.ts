// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import Candidate from "./Candidate";

class Request extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

Request.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    candidate_id: {
      type: DataTypes.UUID,
      references: {
        model: "Candidates", // This should match the name of the table for User model
        key: "id",
      },
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobs_sent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.UUID,
      defaultValue: null,
    },
    is_free: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Request",
    timestamps: true,
  }
);

// Request.belongsTo(Candidate, {
//   foreignKey: "candidate_id",

// });

export default Request;

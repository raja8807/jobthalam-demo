// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Candidate extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

Candidate.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
    whatsapp_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    resume_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    free_requested: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Candidate",
  }
);

export default Candidate;

// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Skill extends Model {}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    skill: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    isIndustry: {
      type: DataTypes.BOOLEAN,
    },
    employer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Employers",
        key: "id",
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Skill",
  }
);

export default Skill;

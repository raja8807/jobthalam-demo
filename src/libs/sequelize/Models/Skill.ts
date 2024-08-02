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
  },
  {
    sequelize,
    modelName: "Skill",
  }
);

export default Skill;

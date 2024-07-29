// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Team",
  }
);

export default Team;

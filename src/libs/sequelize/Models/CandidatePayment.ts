// models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class CandidatePayment extends Model {
  public id!: number;
}

CandidatePayment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.UUID,
    },
    candidate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Candidates",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CandidatePayment",
  }
);

export default CandidatePayment;

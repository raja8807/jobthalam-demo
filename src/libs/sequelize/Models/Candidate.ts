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

// Candidate.hasMany(Request, );

export default Candidate;

// dob "2024-07-17"
// (string)
// education "Bachelor"
// (string)
// email "vivek@gmail.com"
// (string)
// experience "1"
// (string)
// first_name "Vivek"
// (string)
// free_requested true
// (Boolean)
// gender "Male"
// (string)
// id "d632c4fe-b270-4bb9-af94-8573ee2225d5"
// (string)
// last_name "P"
// (string)
// phone_number "7812804854"
// (string)
// resume_url "https://firebasestorage.googleapis.com/v0/b/jt-test-26ac5.appspot.com/o/resumes%2Fd632c4fe-b270-4bb9-af94-8573ee2225d5%2Fresume?alt=media&token=b76a37b5-a1fd-4621-b59b-60991be62876"
// (string)
// skills "Computer Programmer,Web Developer,Information Security Analyst,Database Administrator,Market Research Analyst"
// (string)
// whatsapp_number "7812804854"

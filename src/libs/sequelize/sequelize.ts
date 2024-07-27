// lib/sequelize.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://default:CIsr1Xk0lcGU@ep-mute-thunder-a7gws162.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require" as string,
  {
    dialect: "postgres",
  }
);

export default sequelize;

// lib/sequelize.ts
import { Sequelize } from "sequelize";
import * as pg from "pg";

const sequelize = new Sequelize(
  "postgres://default:CIsr1Xk0lcGU@ep-mute-thunder-a7gws162.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require" as string,
  {
    dialect: "postgres",
    dialectModule: pg,
  }
);

export default sequelize;

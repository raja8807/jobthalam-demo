import pool from "@/libs/pg/db";
import Candidate from "@/libs/sequelize/Models/Candidate";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import Request from "@/libs/sequelize/Models/Request";
import Team from "@/libs/sequelize/Models/Team";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  try {
   

    const result = await sequelize.query(
      getJoinTableQuery(FeaturedJob, {
        include: [
          {
            table: Job,
            foreignKey: "job_id",
          },
        ],
      })
    );

    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;

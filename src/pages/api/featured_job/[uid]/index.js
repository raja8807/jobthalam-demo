import Employer from "@/libs/sequelize/Models/Employer";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
        const result = await sequelize.query(
            getJoinTableQuery(FeaturedJob, {
              include: [
                {
                  table: Job,
                  foreignKey: "job_id",
                },
                {
                  table: Employer,
                  foreignKey: "employer_id",
                },
              ],
            })
          );

      return res.status(200).json(result[0]);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

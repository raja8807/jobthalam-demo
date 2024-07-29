import AdminJob from "@/libs/sequelize/Models/AdminJob";
import Employer from "@/libs/sequelize/Models/Employer";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const jobs = await sequelize.query(
        getJoinTableQuery(FeaturedJob, {
          where: ["candidate_id", "=", req.query.uid],
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

      const adminJObs = await sequelize.query(
        getJoinTableQuery(FeaturedJob, {
          where: ["candidate_id", "=", req.query.uid],
          include: [
            {
              table: AdminJob,
              foreignKey: "admin_job_id",
            },
          ],
        })
      );

      const result = [...jobs[0], ...adminJObs[0]];

      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const [numberOfAffectedRows, affectedRows] = await FeaturedJob.update(
        { status: req.body.status },
        {
          where: { id: req.query.uid },
          returning: true, // This will return the updated rows
        }
      );

      if (numberOfAffectedRows === 0) {
        throw new Error("User not found");
      }

      return res.status(200).json(affectedRows[0]);
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

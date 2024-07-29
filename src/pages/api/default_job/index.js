import AdminJob from "@/libs/sequelize/Models/AdminJob";
import DefaultJob from "@/libs/sequelize/Models/DefaultJob";
import Employer from "@/libs/sequelize/Models/Employer";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   await sequelize.sync();
      const result = await DefaultJob.bulkCreate(req.body.jobs, {
        returning: true,
      });
      return res.status(201).json(result[0]);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  if (req.method === "GET") {
    try {
      // await sequelize.sync({ force: true });
      const jobs = await sequelize.query(
        getJoinTableQuery(DefaultJob, {
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
        getJoinTableQuery(DefaultJob, {
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

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

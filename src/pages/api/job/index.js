import Employer from "@/libs/sequelize/Models/Employer";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await sequelize.query(
        getJoinTableQuery(Job, {
          include: [
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
 
  if (req.method === "PUT") {
    try {
      // await sequelize.sync({ force: true });
      const [numberOfAffectedRows, affectedRows] = await Job.update(
        req.body.job,
        {
          where: { id: req.body.job.id },
          returning: true, // This will return the updated rows
        }
      );

      if (numberOfAffectedRows === 0) {
        throw new Error("Admin Job not found");
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

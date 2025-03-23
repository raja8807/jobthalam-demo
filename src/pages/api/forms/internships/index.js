import AdminJob from "@/libs/sequelize/Models/AdminJob";
import Employer from "@/libs/sequelize/Models/Employer";
import InternshipSubmission from "@/libs/sequelize/Models/InternshipSubmission";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";
import { getJoinTableQuery } from "@/utils/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await InternshipSubmission.findAll({
        include: {
          model: AdminJob,
          foreignKey:'admin_job_id'
        },
      });

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

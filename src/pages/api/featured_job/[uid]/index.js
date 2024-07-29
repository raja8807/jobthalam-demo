// import { FeaturedJob } from "@/libs/sequelize/Models";
// import { FeaturedJob } from "@/libs/sequelize/Models";
import AdminJob from "@/libs/sequelize/Models/AdminJob";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
// import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
// import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
    // await sequelize.sync({ force: true });

      const result = await FeaturedJob.findAll({
        // include: [
        //   {
        //     model: Job,
        //     as: "job",
        //     foreignKey: "job_id",
        //   },
        // ],
        //   {
        //     model: AdminJob,
        //     as: "admin_job",
        //   },

        where: {
          candidate_id: req.query.uid,
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

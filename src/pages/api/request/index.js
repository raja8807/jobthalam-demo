import DefaultJob from "@/libs/sequelize/Models/`DefaulJob";
import AdminJob from "@/libs/sequelize/Models/AdminJob";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import Request from "@/libs/sequelize/Models/Request";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const request = req.body.request;
      const currentUser = req.body.currentUser;

      if (request?.is_free && currentUser.free_requested) {
        throw new Error("Already Requested");
      }

      let result = await Request.create(req.body.request, {
        returning: true,
      });

      let defaultJobs = [];

      if (request?.is_free) {
        defaultJobs = await AdminJob.findAll({
          where: {
            is_free: true,
            skills: currentUser?.skills,
          },
        });
      } else {
        defaultJobs = await AdminJob.findAll({
          where: {
            is_free: false,
            skills: currentUser?.skills,
          },
          limit: request.count,
        });
      }

      if (defaultJobs?.[0]) {
        const featuredJobs = defaultJobs.map((defaultJobJob) => {
          return {
            job_id: defaultJobJob.job_id,
            admin_job_id: defaultJobJob.id,
            request_id: result.id,
            employer_id: defaultJobJob.employer_id,
            candidate_id: currentUser?.id,
            status: "New",
            is_admin_job: defaultJobJob.is_admin_job,
          };
        });

        await FeaturedJob.bulkCreate(featuredJobs);
        const updatedResult = await Request.update(
          { ...result, jobs_sent: featuredJobs.length },
          {
            where: {
              id: result.id,
            },
            returning: true,
          }
        );

        result = updatedResult;
      }

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

import DefaultJob from "@/libs/sequelize/Models/`DefaulJob";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
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

      defaultJobs = await DefaultJob.findAll({
        where: {
          is_free: request?.is_free,
          skill: currentUser?.skills,
        },
      });

      if (defaultJobs?.[0]) {
        const featuredJobs = defaultJobs.map((defaultJobJob) => {
          return {
            job_id: defaultJobJob.job_id,
            admin_job_id: defaultJobJob.admin_job_id,
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

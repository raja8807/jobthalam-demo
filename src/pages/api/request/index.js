import AdminJob from "@/libs/sequelize/Models/AdminJob";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import Request from "@/libs/sequelize/Models/Request";

function getRandomUniqueElements(arr, num) {
  const result = new Set();
  while (result.size < num && result.size < arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.add(arr[randomIndex]);
  }
  return Array.from(result);
}

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const request = req.body.request;
      const currentUser = req.body.currentUser;

      if (request?.is_free && currentUser.free_requested) {
        throw new Error("Already Requested");
      }

      let newRequest = await Request.create(req.body.request, {
        returning: true,
      });

      let result = {};
      const featuredJobs = await FeaturedJob.findAll({
        where: {
          candidate_id: currentUser?.id,
        },
      });

      const AdminJobs = await AdminJob.findAll({
        where: {
          is_free: request.is_free,
          skills: request?.skill,
          status: "Active",
          experience: currentUser.experience,
        },
      });

      console.log(AdminJobs.length);

      const availableAdminJobs = AdminJobs.filter((aj) => {
        return !featuredJobs.some((fj) => fj.admin_job_id === aj.id);
      });

      const availableEmpJobs = [];

      var randomJobs = getRandomUniqueElements(
        [...availableAdminJobs, ...availableEmpJobs],
        request.count
      );

      const featuredJobsToCreate = randomJobs.map((job) => {
        return {
          job_id: job.is_admin_job ? null : job.id,
          admin_job_id: job?.is_admin_job ? job.id : null,
          candidate_id: currentUser.id,
          request_id: newRequest.id,
          employer_id: job.employer_id || null,
          status: "New",
          is_admin_job: job.is_admin_job || null,
        };
      });

      await FeaturedJob.bulkCreate(featuredJobsToCreate);

      await Request.update(
        {
          ...newRequest,
          jobs_sent: featuredJobsToCreate.length,
        },
        {
          where: {
            id: newRequest.id,
          },
        }
      );

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

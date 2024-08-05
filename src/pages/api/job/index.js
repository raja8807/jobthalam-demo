import Employer from "@/libs/sequelize/Models/Employer";
import Job from "@/libs/sequelize/Models/Job";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   await sequelize.sync({ force: true });

      const emp = {
        ...req.body.employer,
        jobs_pending: req.body.employer.jobs_pending - 1,
      };

      if (emp.jobs_pending < 0) {
        throw new Error("No jobs pending");
      }

      const result = await Job.create(req.body.job, {
        returning: true,
      });

      await Employer.update(emp, {
        where: {
          id: emp.id,
        },
      });

      return res.status(201).json(result);
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

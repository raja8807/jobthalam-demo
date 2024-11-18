import Employer from "@/libs/sequelize/Models/Employer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const result = await Employer.create(
        { ...req.body, jobs_pending: 1 },
        {
          returning: true,
        }
      );

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

import AdminJob from "@/libs/sequelize/Models/AdminJob";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const jobs = await AdminJob.findAll({
        where: [
          {
            is_featured: true,
          },
          {
            status: "Active",
          },
        ],
        attributes: [
          "id",
          "company_name",
          "location",
          "salary",
          "duration",
          "experience",
          "type",
          "title",
          'education',
          'createdAt',
          'description'
        ],
      });

      return res.status(200).json(jobs);
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

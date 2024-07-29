import Application from "@/libs/sequelize/Models/Application";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const result = await Application.findAll({
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

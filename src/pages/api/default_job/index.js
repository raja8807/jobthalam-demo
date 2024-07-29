import DefaultJob from "@/libs/sequelize/Models/DefaultJob";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await sequelize.sync();
      const result = await DefaultJob.bulkCreate(req.body.jobs, {
        returning: true,
      });
      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  if (req.method === "GET") {
    try {
      // await sequelize.sync({ force: true });
      const result = await DefaultJob.findAll();
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

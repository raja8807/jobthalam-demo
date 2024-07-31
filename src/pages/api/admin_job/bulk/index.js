import AdminJob from "@/libs/sequelize/Models/AdminJob";
// import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await AdminJob.bulkCreate(req.body.jobs, {
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

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

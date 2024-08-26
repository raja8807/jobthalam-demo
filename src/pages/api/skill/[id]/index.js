import Skill from "@/libs/sequelize/Models/Skill";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const result = await Skill.destroy({
        where: {
          id: req.query.id,
        },
      });
      return res.status(204).json(result);
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
      const result = await Skill.findAll();
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

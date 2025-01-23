import Skill from "@/libs/sequelize/Models/Skill";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const result = await Skill.bulkCreate(req.body.skills, {
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
      const result = await Skill.findAll({
        order: [["createdAt", "ASC"]],
      });

      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  if (req.method === "PUT") {
    try {
      // await sequelize.sync({ force: true });
      const result = await Skill.destroy({
        where: {
          industry: req.body.industry,
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
  if (req.method === "PATCH") {
    try {
      // await sequelize.sync({ force: true });
      console.log(req.body);

      const result = await Skill.bulkCreate(req.body.skills, {
        returning: true,
        updateOnDuplicate: ["is_active"],
      });
      return res.status(204).json(result);
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

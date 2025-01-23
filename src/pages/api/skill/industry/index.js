import Skill from "@/libs/sequelize/Models/Skill";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log('okkkk');
    
    try {
      const result = await Skill.findAll({
        where: {
          isIndustry: true,
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
  if (req.method === "DELETE") {
    try {
      const result = await Skill.update(
        { is_active: false },
        {
          where: {
            industry: "Engineering",
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

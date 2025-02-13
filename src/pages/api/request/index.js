import Candidate from "@/libs/sequelize/Models/Candidate";
import Request from "@/libs/sequelize/Models/Request";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await Request.findAll({
        include: [
          {
            model: Candidate,
            as: "candidate",
            // attributes: ["first_name"],
          },
        ],
      });
      return res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  if (req.method === "POST") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await Request.create(req.body, {
        returning: true,
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

import Request from "@/libs/sequelize/Models/Request";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await Request.findAll({
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
  if (req.method === "PUT") {
    try {
      if (req.body.jobs_sent > req.body.count) {
        throw new Error(
          "Invalid operation. Jobs sent count is higher than request count"
        );
      }

      const [numberOfAffectedRows, affectedRows] = await Request.update(
        req.body,
        {
          where: { id: req.query.uid },
          returning: true, // This will return the updated rows
        }
      );

      if (numberOfAffectedRows === 0) {
        throw new Error("User not found");
      }

      return res.status(200).json(affectedRows[0]);
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

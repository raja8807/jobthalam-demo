import Employer from "@/libs/sequelize/Models/Employer";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   console.log(req.query);
      //   //   await sequelize.sync({ force: true });
      //   const result = await Candidate.create(req.body, {
      //     returning: true,
      //   });

      if (!req.body.user.uid === req.query.uid) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const result = await Employer.findOne({
        where: {
          phone_number: req.query.uid,
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
      //   console.log(req.query);
      //   //   await sequelize.sync({ force: true });
      //   const result = await Candidate.create(req.body, {
      //     returning: true,
      //   });

      if (!req.body.id === req.query.uid) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const [numberOfAffectedRows, affectedRows] = await Employer.update(
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

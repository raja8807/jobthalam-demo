import Employer from "@/libs/sequelize/Models/Employer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
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

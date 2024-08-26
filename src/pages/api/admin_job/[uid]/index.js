import AdminJob from "@/libs/sequelize/Models/AdminJob";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      // await sequelize.sync({ force: true });
      const [numberOfAffectedRows, affectedRows] = await AdminJob.update(
        req.body,
        {
          where: { id: req.query.uid },
          returning: true, // This will return the updated rows
        }
      );

      if (numberOfAffectedRows === 0) {
        throw new Error("Admin Job not found");
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
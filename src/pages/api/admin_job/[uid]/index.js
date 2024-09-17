import AdminJob from "@/libs/sequelize/Models/AdminJob";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
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
  if (req.method === "DELETE") {
    try {
      // await sequelize.sync({ force: true });

      await FeaturedJob.destroy({
        where: { admin_job_id: req.query.uid },
      });

      const result = await AdminJob.destroy({
        where: { id: req.query.uid },
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

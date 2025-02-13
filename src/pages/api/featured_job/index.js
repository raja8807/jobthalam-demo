import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Request from "@/libs/sequelize/Models/Request";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await FeaturedJob.bulkCreate(req.body.jobsToSend, {
        returning: true,
      });

      const [numberOfAffectedRows, affectedRows] = await Request.update(
        req.body.request,
        {
          where: { id: req.body.request.id },
          returning: true, // This will return the updated rows
        }
      );

      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  //   if (req.method === "GET") {
  //     try {
  //       // await sequelize.sync({ force: true });
  //       const result = await AdminJob.findAll();
  //       return res.status(200).json(result);
  //     } catch (err) {
  //       console.log(err.message);
  //       return res.status(500).json({
  //         error: err.message,
  //       });
  //     }
  //   }

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

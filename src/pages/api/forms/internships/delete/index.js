import AdminJob from "@/libs/sequelize/Models/AdminJob";
import InternshipSubmission from "@/libs/sequelize/Models/InternshipSubmission";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   await sequelize.sync({ force: true });
      const result = await InternshipSubmission.destroy({
        where: {
          id: req.body.ids,
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

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

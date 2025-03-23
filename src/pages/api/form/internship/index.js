import InternshipSubmission from "@/libs/sequelize/Models/InternshipSubmission";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;

      console.log(data);


      const result = await InternshipSubmission.create(data, {
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

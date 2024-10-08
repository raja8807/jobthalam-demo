import CandidatePayment from "@/libs/sequelize/Models/CandidatePayment";
// import Request from "@/libs/sequelize/Models/Request";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await sequelize.sync();
      const result = await CandidatePayment.create(req.body, {
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

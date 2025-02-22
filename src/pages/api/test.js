import Candidate from "@/libs/sequelize/Models/Candidate";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  try {
    // console.log(req.headers);
    return res.status(200).json({
      result : 'xx',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;

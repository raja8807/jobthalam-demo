import Employer from "@/libs/sequelize/Models/Employer";
import EmployerPayment from "@/libs/sequelize/Models/EmployerPayment";


const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const result = await EmployerPayment.create(req.body.payment, {
        returning: true,
      });

      const empRes = await Employer.update(req.body.employer, {
        where: {
          id: req.body.employer.id,
        },
        returning: true,
      });

      return res.status(201).json({
        payment: result,
        empRes: empRes,
      });
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

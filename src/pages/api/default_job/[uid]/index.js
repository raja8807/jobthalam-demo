import DefaultJob from "@/libs/sequelize/Models/DefaultJob";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const result = await DefaultJob.destroy({
      where: {
        id: req.query.uid,
      },
    });

    return res.status(204).json(result);
  }

  return res.status(500).json({
    error: "Method not allowed",
  });
};

export default handler;

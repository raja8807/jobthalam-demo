import Candidate from "@/libs/sequelize/Models/Candidate";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    // Candidate.update
    const result = await Candidate.create(
      {
        dob: "2024-07-17",
        education: "Bachelor",
        email: "vivek@gmail.com",
        experience: "1",
        first_name: "Vivek",
        free_requested: true,
        gender: "Male",
        last_name: "P",
        phone_number: "7812804854",
        resume_url:
          "https://firebasestorage.googleapis.com/v0/b/jt-test-26ac5.appspot.com/o/resumes%2Fd632c4fe-b270-4bb9-af94-8573ee2225d5%2Fresume?alt=media&token=b76a37b5-a1fd-4621-b59b-60991be62876",
        skills:
          "Computer Programmer,Web Developer,Information Security Analyst,Database Administrator,Market Research Analyst",
        whatsapp_number: "7812804854",
      },

      {
        returning: true,
      }
    );
    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;

import pool from "@/libs/pg/db";
import Candidate from "@/libs/sequelize/Models/Candidate";
import FeaturedJob from "@/libs/sequelize/Models/FeaturedJob";
import Job from "@/libs/sequelize/Models/Job";
import Request from "@/libs/sequelize/Models/Request";
import Team from "@/libs/sequelize/Models/Team";
import sequelize from "@/libs/sequelize/sequelize";

const handler = async (req, res) => {
  try {
    // await sequelize.sync({ force: true });
    // const result = await Candidate.create(
    //   {
    //     dob: "2024-07-17",
    //     education: "Bachelor",
    //     email: "vivek@gmail.com",
    //     experience: "1",
    //     first_name: "Vivek",
    //     free_requested: true,
    //     gender: "Male",
    //     last_name: "P",
    //     phone_number: "7812804854",
    //     resume_url:
    //       "https://firebasestorage.googleapis.com/v0/b/jt-test-26ac5.appspot.com/o/resumes%2Fd632c4fe-b270-4bb9-af94-8573ee2225d5%2Fresume?alt=media&token=b76a37b5-a1fd-4621-b59b-60991be62876",
    //     skills:
    //       "Computer Programmer,Web Developer,Information Security Analyst,Database Administrator,Market Research Analyst",
    //     whatsapp_number: "7812804854",
    //   },

    //   {
    //     returning: true,
    //   }
    // );

    const getReferencedData = async (tableName, foreignKey, ids) => {
      const query = `SELECT * FROM ${tableName} WHERE ${foreignKey} = ANY($1)`;
      const result = await pool.query(query, [ids]);
      return result.rows;
    };

    // const jobColumns = ["title", "salary"];
    const jobColumns = Object.keys(Job.getAttributes());
    const empColumns = [
      "company_name",
      "email",
      // 'createdAt'
    ];

    //     // console.log(Job.getAttributes().map(j=>j.fieldName));

    //     // console.log();

    //     const result = await pool.query(`
    //           SELECT

    //   j."id",
    //   ${jobColumns.map((c) => `"${c}"`).join(",")},
    //   json_build_object(
    //     'id', e."id",
    //     ${empColumns.map((c) => `${c}, e."${c}"`).join(",")}

    //   ) AS "employer"
    // FROM
    //   "Jobs" AS j
    // JOIN
    //   "Employers" AS e ON j."employer_id" = e."id";

    //           `);

    

    const getData = async (mainTable, refTable, foreignKey) => {

      console.log();

      let mainTableColumns = Object.keys(mainTable.getAttributes());
      let refTableColumns = Object.keys(refTable.getAttributes());

      mainTableColumns = mainTableColumns.filter(mc=> mc !== 'id')
      refTableColumns = refTableColumns.filter(mc=> mc !== 'id')

      const query = `
          SELECT
         
  j."id" ,
  ${mainTableColumns.map((c) => `j."${c}" As ${mainTable.getTableName()}_${c}`).join(",")},
  json_build_object(
    'id', e."id",
    ${refTableColumns.map((c) => `'${c}', e."${c}"`).join(",")}
 
  ) AS "employer"
FROM
  "${mainTable.getTableName()}" AS j
JOIN
  "${refTable.getTableName()}" AS e ON j."candidate_id" = e."id";
  `;

  console.log(query);

      return await pool.query(query);
    };

    const result = await getData(Request, Candidate, "candidate_id");

    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;

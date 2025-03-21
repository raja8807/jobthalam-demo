import HomePage from "@/components/screens/home/home";
import { getAllData } from "@/libs/firebase/firebase";

const Home = ({ data,setShowLogin }) => {
  const candidateHomePageData = {
    bannerData: data?.homePageData?.[0]?.bannerData || {
      title: [
        {
          text: "The Easy Way To Get Your",
        },
        {
          tag: "highlight",
          text: "New Job",
        },
      ],
      caption: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste
                debitis quidem, cupiditate voluptate quasi. Temporibus animi ipsam
                incidunt repudiandae?`,
      image: "/assets/hero1.png",

      cards: [
        {
          id: "1",
          title: "Live Jobs",
          num: "100+",
          icon: "Briefcase",
        },
        {
          id: "2",
          title: "Companies",
          num: "100+",
          icon: "Buildings",
        },
        {
          id: "3",
          title: "Candidates",
          num: "100+",
          icon: "Buildings",
        },
      ],
    },
    vacanciesData: data?.homePageData?.[0]?.vacanciesData || [
      {
        title: "IT Managers",
        positions: 1000,
      },
      {
        title: "Surgeons",
        positions: 1500,
      },
      {
        title: "Web Developer",
        positions: 600,
      },
      {
        title: "Data Scientist",
        positions: 1200,
      },
      {
        title: "Scientist",
        positions: 1200,
      },
    ],

    categoryData: data?.homePageData?.[0]?.categoryData || [
      {
        title: "Design",
        availableJobs: "200",
      },
      {
        title: "Design",
        availableJobs: "200",
      },
      {
        title: "Design",
        availableJobs: "200",
      },
      {
        title: "Design",
        availableJobs: "200",
      },
      {
        title: "Design",
        availableJobs: "200",
      },
      {
        title: "Design",
        availableJobs: "200",
      },
    ],

    candidateTestimonialsData: data?.candidateTestimonialsData?.[0]
      ? data?.candidateTestimonialsData
      : [
          {
            text: "I would like to appreciate  Jobthalam team for extending the continuous cooperation and support. I am happy with the services and would like to continue with the same for fulfilling our hiring needs.",
            name: "Subramanian.K",
            title: "Deputy General Manager,(HYUNDAI) GLOVES INDIA PVT.Ltd.",
          },
          {
            text: " jobthalam.com is great help for us in finding the candidates specially in mechanical engineering. Also jobthalam & Job posting responses are fantastic. We thank you for your continuous support.",
            name: "Dr.VinothKumar K",
            title:
              "Sr.Manager Technology Sales,HUBERT ENVIRO CARE SYSTEMS (P) Ltd.",
          },
          {
            text: " We are happy to share that jobthalam has been a great hiring partner for us. We appreciate its good services, fast and friendly support.",
            name: "Dr.K.G.Parthiban",
            title: "Prinicipal,DHANISH AHAMED INSTITUTE OF TECHNOLOGY.",
          },
          {
            text: " I would like to thank jobthalam team for the great amount of support that they have provided. We are really happy with the services of jobthalam and very much satisfied in using it.",
            name: "Dr.R.Vijayarangan",
            title:
              "Advisor,Innovation&Incubation,GNANAMANI COLLEGE OF TECHNOLOGY.",
          },
          {
            text: " jobthalam is the real deal - a great partner and passionate champion of remote work! They help Sundaram Fasteners ltd connect with job seekers who are specifically looking for remote and/or flexible work.",
            name: "KALIMUTHU.K",
            title:
              "Deputy General Manager-Personal,SUNDARAM FASTENERS LIMITED Autolec Division.",
          },
          {
            text: " jobthalam system is user friendly and easy to use. Also, we have found jobthalam and their support staff to be efficient, friendly and professional. We have no hesitation in recommending jobthalam.com.",
            name: "Dr.I.Paul Theophilos Rajkumar",
            title:
              "Undustry Collaboration and Placement,PANIMALAR ENGINEERING COLLEGE.",
          },
          {
            text: " jobthalam.com has beyond doubt helped many organization grow in a big way. The database is quite good enough for us to bank on in satisfying our client's requirement. We are content with the service delivery from the support staff who are extremely hospitable…Way to go jobthalam.",
            name: "S.SenthilKumar",
            title: "Chief Executive Officer,TANSTIA-FNF SERVICE CENTRE.",
          },
          {
            text: " Just a note to express my appreciation for the outstanding service that we receive from jobthalam.com, we have had their service for about 3 years now, and have been very happy with the service offered. Jobthalam.com has helped to make our recruitment process much easier and cost effective.",
            name: "Aloha.K.Kumaran",
            title: "Chief Executive Officer,ALOHA INDIA PVT.Ltd.",
          },
        ],

    candidateFaqData: data?.candidateFaqData?.[0]
      ? data?.candidateFaqData
      : [
          {
            question: " How frequently are jobs updated on Jobthalam?",
            answer:
              "We add new jobs all day, every day we want you to have access to the newest job listings available.",
          },
          {
            question:
              " How can I contact support if I have questions or issues?",
            answer:
              "For any questions or concerns you can reach out to us on our contact page. We will respond to your inquiry as soon as possible.",
          },
          {
            question: " Is it free to use Jobthalam for job searching?",
            answer:
              "Two free jobs offered with limited details, if you want to get the full details for 10 job alerts, you must sign up for Jobthalam Premium. Visit our pricing page to join jobthalam Premium.",
          },
          {
            question: " How do I enter my preferred Industry?",
            answer:
              "In update profile section you can select the (Industry) skills from the drop down menu.",
          },
          {
            question: " I don't see many jobs posted for my location.",
            answer:
              "Most executive and senor executive jobs no longer require relocation",
          },
          {
            question: " How do I post a job?",
            answer:
              "After registering your details and activating your account, you will be able to purchase plan via the portal. Each purchase will give you 10 job alerts with brief details.",
          },
          {
            question: " How can I edit my personal information?",
            answer:
              "You may edit your information via the website at any time by logging into your account.",
          },
          {
            question: " What information do Job seekers need to provide?",
            answer:
              "Job seekers need to provide a Name, valid email address, whatsApp number and DOB, to create an account. Once your account is created and verified, you can create your profile by providing your work experience, qualifications, upload your CV.",
          },
          {
            question: " What makes Jobthalam special?",
            answer:
              "As a job seeker, you can create an account via the Jobthalam website for free. Will be asked to create your profile, upload a CV that you can upload. After completing your profile, you will be able to receive 2 free jobs via whatsapp instantly, browse jobs, apply and manage job applications and receive notifications, all within the portal.",
          },
          {
            question: ".When will I start receiving candidates response?",
            answer: "You will receive a response within 48 Hours",
          },
          {
            question: " What type of payment you will accept? ",
            answer: "We accept all types of payment methods",
          },
        ],

    cards: data?.homePageData?.[0]?.cards,
  };
  return <HomePage candidateHomePageData={candidateHomePageData} setShowLogin={setShowLogin} />;
};

export default Home;

export async function getServerSideProps() {
  try {
    const homePageData = (await getAllData("candidateHomePageData")) || [];
    const candidateTestimonialsData =
      (await getAllData("candidateTestimonialsData")) || [];
    const candidateFaqData = (await getAllData("candidateFaqData")) || [];

    const data = {
      homePageData,
      candidateTestimonialsData,
      candidateFaqData,
    };
    return { props: { data: data || null } };
  } catch (ex) {
    return { props: { data: null } };
  }
}

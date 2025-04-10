import Footer from "@/components/layout/footer/footer";
import BannerSection from "./sections/banner/banner";
import HowItWorks from "./sections/how_it_works/how_it_works";
import RegisterSection from "./sections/register/register";
import VacanciesSection from "./sections/vacancies/vacancies";
import DiscoverSection from "./sections/discover/discover";
import ExploreSection from "./sections/explore/explore";
import FaqSection from "./sections/faq/faq";
import NewsLetterSection from "./sections/news_letter/news_letter";
import JobsSection from "./sections/jobs/jobs";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { duplicate } from "@/libs/firebase/firebase";

const HomeScreen = ({ setShowLogin,employerHomePageData = {} }) => {
  return (
    <main>
      
      <BannerSection bannerData={employerHomePageData.bannerData} />
      <VacanciesSection vacanciesData={employerHomePageData?.vacanciesData} />
      <JobsSection setShowLogin={setShowLogin}/>
      {/* <ExploreSection categoryData={employerHomePageData.categoryData} /> */}
      <HowItWorks />
      <DiscoverSection
        testimonials={employerHomePageData.employerTestimonialsData}
      />
      <FaqSection faqs={employerHomePageData.employerFaqData} />
      <RegisterSection cards={employerHomePageData?.cards} />
      <NewsLetterSection />
      <Footer />
    </main>
  );
};

export default HomeScreen;

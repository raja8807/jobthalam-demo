import Footer from "@/components/layout/footer/footer";
import BannerSection from "./sections/banner/banner";
import HowItWorks from "./sections/how_it_works/how_it_works";
import RegisterSection from "./sections/register/register";
import VacanciesSection from "./sections/vacancies/vacancies";
import DiscoverSection from "./sections/discover/discover";
import ExploreSection from "./sections/explore/explore";
import FaqSection from "./sections/faq/faq";
import NewsLetterSection from "./sections/news_letter/news_letter";

const HomeScreen = ({ candidateHomePageData = {} }) => {
  return (
    <main>
      <BannerSection bannerData={candidateHomePageData.bannerData} />
      <VacanciesSection vacanciesData={candidateHomePageData?.vacanciesData} />
      <ExploreSection categoryData={candidateHomePageData.categoryData} />
      <HowItWorks />
      <DiscoverSection
        testimonials={candidateHomePageData.candidateTestimonialsData}
      />
      <FaqSection faqs={candidateHomePageData.candidateFaqData} />
      <RegisterSection />
      <NewsLetterSection />
      <Footer />
    </main>
  );
};

export default HomeScreen;

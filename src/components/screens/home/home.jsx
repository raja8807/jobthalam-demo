import Footer from "@/components/layout/footer/footer";
import BannerSection from "./sections/banner/banner";
import HowItWorks from "./sections/how_it_works/how_it_works";
import RegisterSection from "./sections/register/register";
import VacanciesSection from "./sections/vacancies/vacancies";
import DiscoverSection from "./sections/discover/discover";
import ExploreSection from "./sections/explore/explore";
import FaqSection from "./sections/faq/faq";
import NewsLetterSection from "./sections/news_letter/news_letter";

const HomeScreen = () => {
  return (
    <main>
      <BannerSection />
      <DiscoverSection />
      <ExploreSection />
      <VacanciesSection />
      <HowItWorks />
      <FaqSection />
      <RegisterSection />
      <NewsLetterSection />
      <Footer />
    </main>
  );
};

export default HomeScreen;

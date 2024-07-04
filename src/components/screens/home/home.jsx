import BannerSection from "./sections/banner/banner";
import HowItWorks from "./sections/how_it_works/how_it_works";
import VacanciesSection from "./sections/vacancies/vacancies";

const HomeScreen = () => {
  return (
    <main>
      <BannerSection />
      <VacanciesSection />
      <HowItWorks/>
    </main>
  );
};

export default HomeScreen;

import Footer from "@/components/layout/footer/footer";
import BannerSection from "./sections/banner/banner";
import HowItWorks from "./sections/how_it_works/how_it_works";
import RegisterSection from "./sections/register/register";
import VacanciesSection from "./sections/vacancies/vacancies";

const HomeScreen = () => {
  return (
    <main>
      <BannerSection />
      <VacanciesSection />
      <HowItWorks/>
      <RegisterSection/>
      <Footer/>
    </main>
  );
};

export default HomeScreen;

import FeaturedProperties from "./_components/featured-properties";
import { Hero } from "./_components/hero";
import HomeCTA from "./_components/home-cta";
import HowItWorks from "./_components/how-it-works";
import WhyChooseUs from "./_components/why-choose-us";


export const HomePage = () => {
  
  return (
    <>
     <Hero/>
     <FeaturedProperties/>
     <WhyChooseUs/>
     <HowItWorks/>
     <HomeCTA/>
      
    </>
  );
};

export default HomePage;
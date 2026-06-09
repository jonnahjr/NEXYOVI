import EngagementModels from '../components/EngagementModels';
import FeaturedProjects from '../components/FeaturedProjects';
import FinalCTA from '../components/FinalCTA';
import Hero from '../components/Hero';
import HowWeWork from '../components/HowWeWork';
import IndustriesSection from '../components/IndustriesSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialSection from '../components/TestimonialSection';
import TrustLogos from '../components/TrustLogos';
import WhyNexyoviSection from '../components/WhyNexyoviSection';
import TechnologiesSection from '../components/TechnologiesSection';
import DeliverySection from '../components/DeliverySection';
import SecuritySection from '../components/SecuritySection';

const Home = () => {
  return (
    <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-[#F5A800]/30">
      <Hero />
      <TrustLogos />
      <WhyNexyoviSection />
      <ServicesSection />
      <TechnologiesSection />
      <IndustriesSection />
      <HowWeWork />
      <FeaturedProjects />
      <DeliverySection />
      <TestimonialSection />
      <EngagementModels />
      <SecuritySection />
      <FinalCTA />
    </div>
  );
};

export default Home;

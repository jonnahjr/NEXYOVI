import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import WhyNexyoviSection from '../components/WhyNexyoviSection';
import EnterpriseCapabilities from '../components/EnterpriseCapabilities';
import ServicesSection from '../components/ServicesSection';
import IndustriesSection from '../components/IndustriesSection';
import EnterpriseStandards from '../components/EnterpriseStandards';
import ClientOutcomes from '../components/ClientOutcomes';
import FeaturedProjects from '../components/FeaturedProjects';
import FounderStory from '../components/FounderStory';
import GlobalPresence from '../components/GlobalPresence';
import EngagementModels from '../components/EngagementModels';
import HeroTrustSection from '../components/HeroTrustSection';

const Home = () => {
 return (
  <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#F5A800]/30">
   <Hero />
   <TrustLogos />
   <WhyNexyoviSection />
   <EnterpriseCapabilities />
   <ServicesSection />
   <IndustriesSection />
   <EnterpriseStandards />
   <ClientOutcomes />
   <FeaturedProjects />
   <FounderStory />
   <GlobalPresence />
   <EngagementModels />
   <HeroTrustSection />
  </div>
 );
};

export default Home;

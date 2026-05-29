import AIIntelligenceSection from '../components/AIIntelligenceSection';
import BottlenecksSection from '../components/BottlenecksSection';
import CompanyMetrics from '../components/CompanyMetrics';
import CoreDisciplines from '../components/CoreDisciplines';
import CyberDefenseSection from '../components/CyberDefenseSection';
import EnterpriseTrustBar from '../components/EnterpriseTrustBar';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
import FounderStory from '../components/FounderStory';
import Hero from '../components/Hero';
import HeroTrustSection from '../components/HeroTrustSection';
import IndustriesSection from '../components/IndustriesSection';
import NetworkInfraSection from '../components/NetworkInfraSection';
import ServicesSection from '../components/ServicesSection';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-[#F5A800]/30">

      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Enterprise Trust Layer */}
      <EnterpriseTrustBar />

      {/* 3. Core Disciplines / Philosophy */}
      <CoreDisciplines />

      {/* 4. Core Services Grid (Bento) */}
      <ServicesSection />

      {/* 5. Cybersecurity Systems */}
      <CyberDefenseSection />

      {/* 6. Networking Infrastructure */}
      <NetworkInfraSection />

      {/* 7. AI Intelligence Systems */}
      <AIIntelligenceSection />

      {/* 8. Bottlenecks — Problem vs. Solution */}
      <BottlenecksSection />

      {/* 9. Industries */}
      <IndustriesSection />

      {/* 9. Enterprise Case Studies */}
      <FeaturedCaseStudy />

      {/* 10. Company Metrics */}
      <CompanyMetrics />

      {/* 11. Founder Vision */}
      {/* Note: I will use FounderStory for Founder Vision as they serve the same narrative purpose */}
      <FounderStory />

      {/* 12. Client Testimonials */}
      <Testimonials />

      {/* 13. Final Enterprise CTA */}
      <HeroTrustSection />

    </div>
  );
};

export default Home;

import BottlenecksSection from '../components/BottlenecksSection';
import CompanyMetrics from '../components/CompanyMetrics';
import CoreDisciplines from '../components/CoreDisciplines';
import TrustLogos from '../components/TrustLogos';
import EngagementModels from '../components/EngagementModels';
import EnterpriseCapabilities from '../components/EnterpriseCapabilities';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
import FeaturedProjects from '../components/FeaturedProjects';
import FounderStory from '../components/FounderStory';
import GlobalPresence from '../components/GlobalPresence';
import Hero from '../components/Hero';
import HeroTrustSection from '../components/HeroTrustSection';
import ProcessSection from '../components/ProcessSection';
import IndustriesSection from '../components/IndustriesSection';
import ServicesSection from '../components/ServicesSection';
import TechEcosystem from '../components/TechEcosystem';
import Testimonials from '../components/Testimonials';
import TrustedByMarquee from '../components/TrustedByMarquee';
import WhyNexyoviSection from '../components/WhyNexyoviSection';
import WhySwitchSection from '../components/WhySwitchSection';

const Home = () => {
 return (
 <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#F5A800]/30">

 <Hero />
 <TrustLogos />
 <WhyNexyoviSection />
 <WhySwitchSection />
 <CoreDisciplines />

 {/* 7. Core Services Grid (Bento) */}
 <ServicesSection />

 {/* 8. Enterprise Capabilities */}
 <EnterpriseCapabilities />

 {/* 9. Our Process */}
 <ProcessSection />

 {/* 10. Technology Ecosystem */}
 <TechEcosystem />

 {/* 11. Bottlenecks — Problem vs. Solution */}
 <BottlenecksSection />

 {/* 12. Featured Projects */}
 <FeaturedProjects />

 {/* 13. Client Testimonials */}
 <Testimonials />

 {/* 14. Founder Vision */}
 <FounderStory />

 {/* 15. Company Metrics */}
 <CompanyMetrics />

 {/* 16. Global Presence */}
 <GlobalPresence />

 {/* 17. Industries */}
 <IndustriesSection />

 {/* 18. Enterprise Case Studies */}
 <FeaturedCaseStudy />

 {/* 19. Engagement Models */}
 <EngagementModels />

 {/* 20. Trusted By Marquee */}
 <TrustedByMarquee />

 {/* 21. Final Enterprise CTA */}
 <HeroTrustSection />

 </div>
 );
};

export default Home;

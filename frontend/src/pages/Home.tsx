import BottlenecksSection from '../components/BottlenecksSection';
import ClientLogos from '../components/ClientLogos';
import CompanyMetrics from '../components/CompanyMetrics';
import CoreDisciplines from '../components/CoreDisciplines';
import EnterpriseTrustBar from '../components/EnterpriseTrustBar';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
import FeaturedProjects from '../components/FeaturedProjects';
import FounderStory from '../components/FounderStory';
import Hero from '../components/Hero';
import HeroTrustSection from '../components/HeroTrustSection';
import ProcessSection from '../components/ProcessSection';
import IndustriesSection from '../components/IndustriesSection';
import ServicesSection from '../components/ServicesSection';
import TechPartners from '../components/TechPartners';
import Testimonials from '../components/Testimonials';
import WhyNexyoviSection from '../components/WhyNexyoviSection';
import WhySwitchSection from '../components/WhySwitchSection';

const Home = () => {
 return (
 <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#F5A800]/30">

 {/* 1. Cinematic Hero */}
 <Hero />

 {/* 2. Client Logos */}
 <ClientLogos />

 {/* 3. Enterprise Trust Layer */}
 <EnterpriseTrustBar />

 {/* 4. Why Businesses Choose Nexyovi */}
 <WhyNexyoviSection />

 {/* 5. Why Companies Switch */}
 <WhySwitchSection />

 {/* 5. Core Disciplines / Philosophy */}
 <CoreDisciplines />

 {/* 6. Core Services Grid (Bento) */}
 <ServicesSection />

 {/* 7. Our Process */}
 <ProcessSection />

 {/* 11. Technology Partners */}
 <TechPartners />

 {/* 12. Bottlenecks — Problem vs. Solution */}
 <BottlenecksSection />

 {/* 12. Featured Projects */}
 <FeaturedProjects />

 {/* 13. Industries */}
 <IndustriesSection />

 {/* 14. Enterprise Case Studies */}
 <FeaturedCaseStudy />

 {/* 14. Company Metrics */}
 <CompanyMetrics />

 {/* 15. Founder Vision */}
 <FounderStory />

 {/* 16. Client Testimonials */}
 <Testimonials />

 {/* 17. Final Enterprise CTA */}
 <HeroTrustSection />

 </div>
 );
};

export default Home;

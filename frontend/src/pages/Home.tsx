import EngagementModels from '../components/EngagementModels';
import FeaturedProjects from '../components/FeaturedProjects';
import FinalCTA from '../components/FinalCTA';
import FounderStory from '../components/FounderStory';
import Hero from '../components/Hero';
import IndustriesSection from '../components/IndustriesSection';
import ServicesSection from '../components/ServicesSection';
import Testimonials from '../components/Testimonials';
import TrustLogos from '../components/TrustLogos';
import WhyNexyoviSection from '../components/WhyNexyoviSection';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#F5A800]/30">
            <Hero />
            <TrustLogos />
            <WhyNexyoviSection />
            <ServicesSection />
            <IndustriesSection />
            <FeaturedProjects />
            <Testimonials />
            <FounderStory />
            <EngagementModels />
            <FinalCTA />
        </div>
    );
};

export default Home;

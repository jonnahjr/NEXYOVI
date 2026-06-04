import EngagementModels from '../components/EngagementModels';
import EthiopianPartners from '../components/EthiopianPartners';
import FeaturedProjects from '../components/FeaturedProjects';
import FinalCTA from '../components/FinalCTA';
import FounderStory from '../components/FounderStory';
import Hero from '../components/Hero';
import HowWeWork from '../components/HowWeWork';
import IndustriesSection from '../components/IndustriesSection';
import ServicesSection from '../components/ServicesSection';
import WhyNexyoviSection from '../components/WhyNexyoviSection';

const Home = () => {
    return (
        <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-[#F5A800]/30">
            <Hero />
            <EthiopianPartners />
            <WhyNexyoviSection />
            <ServicesSection />
            <IndustriesSection />
            <HowWeWork />
            <FeaturedProjects />
            <EngagementModels />
            <FounderStory />
            <FinalCTA />
        </div>
    );
};

export default Home;

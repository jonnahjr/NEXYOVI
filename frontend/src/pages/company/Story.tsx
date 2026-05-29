import CompanyStory from '../../components/CompanyStory';
import FounderStory from '../../components/FounderStory';

const Story = () => {
  return (
    <div className="bg-[#02040a] min-h-screen pt-24">
      <FounderStory />
      <CompanyStory />
    </div>
  );
};

export default Story;

import "./HomePage.css";
import HeroSection from "../components/HomePage/HeroSection";
import MapSection from "../components/HomePage/MapSection";
import HotIssuesSection from "../components/HomePage/HotIssuesSection";
import StatsSection from "../components/HomePage/StatsSection";
import HowItWorksSection from "../components/HomePage/HowItWorksSection";

const HomePage = () => {
  return (
    <div className="bg-blue-100">
      <HeroSection />
      <HowItWorksSection />
      <MapSection />
      <HotIssuesSection />
    </div>
  );
};

export default HomePage;

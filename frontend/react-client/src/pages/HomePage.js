import "./HomePage.css";
import HeroSection from "../components/HomePage/HeroSection";
import MapSection from "../components/HomePage/MapSection";
import HotIssuesSection from "../components/HomePage/HotIssuesSection";

const HomePage = () => {
  return (
    <div className="bg-blue-100">
      <HeroSection />
      <MapSection />
      <HotIssuesSection />
    </div>
  );
};

export default HomePage;

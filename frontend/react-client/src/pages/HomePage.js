import "./HomePage.css";
import HeroSection from "../components/HomePage/HeroSection";
import MapSection from "../components/HomePage/MapSection";
import HotIssuesSection from "../components/HomePage/HotIssuesSection";

const issues = [
  { id: 1, title: "Яма на дороге", status: "В ожидании", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Не работает фонарь", status: "Решено", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Сломанная лавочка", status: "В процессе", image: "https://via.placeholder.com/150" }
];

const HomePage = () => {
  return (
    <div className="bg-blue-100">
      <HeroSection />
      <MapSection />
      <HotIssuesSection issues={issues} />
    </div>
  );
};

export default HomePage;

// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import IssuesPage from './pages/IssuesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ReportPage from './pages/ReportPage';
import CategoryPage from './pages/CategoryPage';
import AdminPanel from './pages/AdminPanel';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/report" element={<Layout><ReportPage/></Layout>} />
        <Route path="/map" element={<Layout><MapPage /></Layout>} />
        <Route path="/issues" element={<Layout><IssuesPage /></Layout>} />
        <Route path="/categoryy" element={<Layout><CategoryPage/></Layout>} />
        <Route path="/about" element={<Layout><AboutPage/></Layout>} />

        <Route path="/login" element={<Layout><LoginPage/></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage/></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import IssuesPage from './pages/IssuesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/report" element={<Layout><div>Страница подачи проблемы</div></Layout>} />
        <Route path="/map" element={<Layout><MapPage /></Layout>} />
        <Route path="/issues" element={<Layout><IssuesPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage/></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage/></Layout>} />
        <Route path="/about" element={<Layout><AboutPage/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
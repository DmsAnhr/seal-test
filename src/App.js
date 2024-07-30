import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Newest from './pages/Newest';
import Entertainment from './pages/Entertainment';
import Lifestyle from './pages/Lifestyle';
import Sport from './pages/Sport';
import Economy from './pages/Economy';
import Technology from './pages/Technology';
import Nationals from './pages/Nationals';
import International from './pages/International';
import NewsDetail from './pages/NewsDetail';

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terbaru" element={<Newest />} />
          <Route path="/hiburan" element={<Entertainment />} />
          <Route path="/gaya-hidup" element={<Lifestyle />} />
          <Route path="/olahraga" element={<Sport />} />
          <Route path="/ekonomi" element={<Economy />} />
          <Route path="/teknologi" element={<Technology />} />
          <Route path="/nasional" element={<Nationals />} />
          <Route path="/internasional" element={<International />} />
          <Route path="/news/:category/:link" element={<NewsDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

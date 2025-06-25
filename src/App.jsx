import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contacto from './pages/Contact';
import Proyectos from './pages/Proyects';
import GSAPShowcaseSimple from './pages/GSAPShowcaseSimple';
import JSStackedCards from './pages/JSStackedCards';
import LenisShowcase from './pages/LenisShowcase';
import NodejsAPI from './pages/NodejsAPI';
import MongoDBDocs from './pages/MongoDBDocs';
import CSSDocumentation from './pages/CSSDocumentation';
import InteractiveEffects from './components/InteractiveEffects';
import ScrollProgress from './components/ScrollProgress';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis(); // scroll suave con Lenis

  return (
    <>
      <InteractiveEffects />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/gsap-showcase" element={<GSAPShowcaseSimple />} />
        <Route path="/js-stacked-cards" element={<JSStackedCards />} />
        <Route path="/lenis-showcase" element={<LenisShowcase />} />
        <Route path="/nodejs-api" element={<NodejsAPI />} />
        <Route path="/mongodb-docs" element={<MongoDBDocs />} />
        <Route path="/css-documentation" element={<CSSDocumentation />} />
      </Routes>
    </>
  );
}

export default App;


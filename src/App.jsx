import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { useStarfield } from './hooks/useStarfield';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const starfieldRef = useStarfield(250);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <div className="App">
      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}
      <canvas
        ref={starfieldRef}
        id="starfield"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          backgroundColor: 'var(--primary-color)',
          display: 'block'
        }}
      />
      <Navbar />
      <Hero showAnimation={introComplete} />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;


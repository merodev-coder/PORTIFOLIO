import { useEffect, useRef } from 'react';

const Hero = ({ showAnimation }) => {
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    if (showAnimation) {
      const elements = [
        { ref: subtitleRef, delay: 0 },
        { ref: titleRef, delay: 0.1 },
        { ref: descriptionRef, delay: 0.2 },
        { ref: buttonsRef, delay: 0.3 }
      ];

      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          setTimeout(() => {
            ref.current.classList.add('slide-in');
          }, delay * 1000);
        }
      });
    }
  }, [showAnimation]);

  const handleViewProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      const offset = 80;
      const targetPosition = projectsSection.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-subtitle" ref={subtitleRef}>
        <span className="hero-line"></span>
        <span className="hero-name">Ammar Altanany, Junior Front-End Developer</span>
      </div>
      <h1 className="hero-title" ref={titleRef}>
        <span className="text-white">Junior UI/UX </span><br />
        <span className="text-orange">& Front-EndDeveloper.</span>
      </h1>
      <p className="hero-description" ref={descriptionRef}>
        I modernize outdated front-end experiences with clean, scalable, and accessible interfaces—bringing clarity and efficiency to complex applications.
      </p>
      <div className="hero-buttons" ref={buttonsRef}>
        <button className="btn-primary" onClick={handleViewProjects}>
          View projects
          <span className="arrow">→</span>
        </button>
        <button className="btn-secondary">
          Download resume
          <span className="download-icon">↓</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;


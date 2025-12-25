import { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });

      if (window.scrollY < 100) {
        setActiveLink('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, targetId) => {
    e.preventDefault();
    setActiveLink(targetId);

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetSection = document.querySelector(`#${targetId}`);
      if (targetSection) {
        const offset = 80;
        const targetPosition = targetSection.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="navbar">
      <a 
        href="#home" 
        className={`navlink ${activeLink === 'home' ? 'active' : ''}`}
        onClick={(e) => handleClick(e, 'home')}
      >
        HOME
      </a>
      <a 
        href="#about" 
        className={`navlink ${activeLink === 'about' ? 'active' : ''}`}
        onClick={(e) => handleClick(e, 'about')}
      >
        ABOUT
      </a>
      <a 
        href="#projects" 
        className={`navlink ${activeLink === 'projects' ? 'active' : ''}`}
        onClick={(e) => handleClick(e, 'projects')}
      >
        PROJECTS
      </a>
      <a 
        href="#contact" 
        className={`navlink ${activeLink === 'contact' ? 'active' : ''}`}
        onClick={(e) => handleClick(e, 'contact')}
      >
        CONTACT
      </a>
    </nav>
  );
};

export default Navbar;


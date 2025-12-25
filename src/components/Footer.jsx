import { useEffect, useRef } from 'react';

const Footer = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = [
      { ref: titleRef, delay: '0s' },
      { ref: textRef, delay: '0.1s' },
      { ref: linksRef, delay: '0.2s' },
      { ref: footerRef, delay: '0.3s' }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.transitionDelay = delay;
        observer.observe(ref.current);
      }
    });

    return () => {
      elements.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <section id="contact" className="footer-section">
      <h2 className="footer-title" ref={titleRef}>
        <span className="text-white">Let's build something</span>
        <span className="text-orange"> scalable.</span>
      </h2>
      <p className="footer-text" ref={textRef}>
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>
      <div className="social-links" ref={linksRef}>
        <a href="#" className="social-link">
          LinkedIn
          <span className="arrow">↗</span>
        </a>
        <a href="#" className="social-link">
          GitHub
          <span className="arrow">↗</span>
        </a>
        <a href="#" className="social-link">
          Email
          <span className="arrow">↗</span>
        </a>
      </div>
      <footer className="footer" ref={footerRef}>
        <p>©2025 Ammar Altanany. All Rights Reserved.</p>
      </footer>
    </section>
  );
};

export default Footer;


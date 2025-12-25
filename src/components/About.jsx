import { useEffect, useRef } from 'react';

const About = () => {
  const contentRef = useRef(null);
  const photoRef = useRef(null);

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

    if (contentRef.current) {
      contentRef.current.style.transitionDelay = '0s';
      observer.observe(contentRef.current);
    }
    if (photoRef.current) {
      photoRef.current.style.transitionDelay = '0.1s';
      observer.observe(photoRef.current);
    }

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (photoRef.current) observer.unobserve(photoRef.current);
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-content" ref={contentRef}>
        <h2 className="section-title">
          <span className="text-white">Front-End Developer,</span>
          <span className="text-orange"> UI/UX Designer & Gamer</span>
        </h2>
        <p className="about-text">
          Coding isn't just about writing functions and components. It's about creating experiences that feel natural, intuitive, and effortless for real people.
        </p>
        <br />
        <p className="about-text2">
          I thrive on problem-solving, collaboration, and continuous learning, with the goal of crafting seamless, enjoyable, and impactful experiences—whether refining existing products or building them from the ground up.
        </p>
      </div>
      <div className="about-photo" ref={photoRef}>
        <div className="photo-placeholder">photo</div>
      </div>
    </section>
  );
};

export default About;


import { useEffect, useRef } from 'react';

const Project = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

    if (titleRef.current) {
      titleRef.current.style.transitionDelay = '0s';
      observer.observe(titleRef.current);
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.transitionDelay = `${(index + 1) * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const projects = [
    {
      tag: "Web Application",
      name: "CYBERTRICKS",
      description: "CyberTricks provides practical cybersecurity tips, ethical hacking insights, and essential tools to help you stay secure in the digital world.",
      special: false
    },
    {
      tag: 'Web Application',
      name: 'Project Name',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae reprehenderit officiis recusandae illo ipsum molestiae placeat ut incidunt',
      special: true
    },
    {
      tag: 'UI/UX Design',
      name: 'Project Name 3',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae reprehenderit officiis recusandae illo ipsum molestiae placeat ut incidunt',
      special: false
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2 className="projects-title text-orange" ref={titleRef}>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className={`project-card ${project.special ? 'project-card-special' : ''}`}
          >
            <div className="project-content">
              <span className={`project-tag ${project.special ? 'project-tag-special' : ''}`}>
                {project.tag}
              </span>
              <h3 className={`project-name ${project.special ? 'project-name-special' : ''}`}>
                {project.name}
              </h3>
              <p className={`project-description ${project.special ? 'project-description-special' : ''}`}>
                {project.description}
              </p>
              <a href="https://694cbe05d57c3cb8b81fb23b--relaxed-heliotrope-4c06c4.netlify.app">
                <button className={`btn-project ${project.special ? 'btn-project-special' : ''}`}>
                view project
                <span className="arrow">↗</span>
              </button></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;


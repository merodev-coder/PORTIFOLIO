import { useEffect, useRef } from 'react';

const Projects = () => {
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
      tag: 'Web Application',
      name: 'Project Name 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
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
              <button className={`btn-project ${project.special ? 'btn-project-special' : ''}`}>
                view project
                <span className="arrow">↗</span>
              </button>
            </div>
            <div className="project-image">
              <div className={`project-photo-placeholder ${project.special ? 'project-photo-special' : ''}`}>
                project photo
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


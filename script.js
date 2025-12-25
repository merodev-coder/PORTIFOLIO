// Starfield Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Star class
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Small stars between 0.5 and 2.5px
        this.speed = Math.random() * 0.5 + 0.1; // Slow movement
        this.opacity = Math.random() * 0.8 + 0.2; // Base opacity
        this.twinkleSpeed = Math.random() * 0.02 + 0.01; // Twinkling speed
        this.twinklePhase = Math.random() * Math.PI * 2; // Random starting phase
    }

    update() {
        // Move star slowly
        this.y += this.speed;
        
        // Reset if star goes off screen
        if (this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = -2;
        }

        // Twinkling effect using sine wave
        this.twinklePhase += this.twinkleSpeed;
        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7; // Oscillate between 0.4 and 1.0
        this.currentOpacity = this.opacity * twinkle;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
        ctx.fill();
        
        // Add a subtle glow effect for some stars
        if (this.size > 1.5) {
            ctx.shadowBlur = 3;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

// Create stars array
const numStars = 250; // Number of stars
const stars = [];

// Set canvas size to cover entire viewport
function resizeCanvas() {
    const width = window.innerWidth || document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Redistribute stars when resizing
    if (stars.length > 0) {
        stars.forEach(star => {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        });
    }
}

// Initialize stars after canvas is ready
function initStars() {
    stars.length = 0; // Clear existing stars
    // Ensure canvas is sized before creating stars
    resizeCanvas();
    
    for (let i = 0; i < numStars; i++) {
        const star = new Star();
        stars.push(star);
    }
}

// Animation loop
function animate() {
    // Ensure canvas is properly sized
    const currentWidth = window.innerWidth || document.documentElement.clientWidth;
    const currentHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (canvas.width !== currentWidth || canvas.height !== currentHeight) {
        resizeCanvas();
    }
    
    // Clear canvas completely for clean stars
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background with very transparent overlay for trailing effect
    ctx.fillStyle = 'rgba(17, 26, 25, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each star
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize when DOM is ready
function startStarfield() {
    resizeCanvas();
    initStars();
    animate();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startStarfield);
} else {
    startStarfield();
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Intro screen starfield
function initIntroStarfield() {
    const introCanvas = document.getElementById('intro-starfield');
    if (!introCanvas) return;
    
    const introCtx = introCanvas.getContext('2d');
    
    function resizeIntroCanvas() {
        introCanvas.width = window.innerWidth;
        introCanvas.height = window.innerHeight;
    }
    resizeIntroCanvas();
    window.addEventListener('resize', resizeIntroCanvas);
    
    class IntroStar {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * introCanvas.width;
            this.y = Math.random() * introCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
            this.twinklePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.y += this.speed;
            if (this.y > introCanvas.height) {
                this.x = Math.random() * introCanvas.width;
                this.y = -2;
            }
            this.twinklePhase += this.twinkleSpeed;
            const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
            this.currentOpacity = this.opacity * twinkle;
        }
        
        draw() {
            introCtx.beginPath();
            introCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            introCtx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
            introCtx.fill();
            if (this.size > 1.5) {
                introCtx.shadowBlur = 3;
                introCtx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                introCtx.fill();
                introCtx.shadowBlur = 0;
            }
        }
    }
    
    const introStars = [];
    for (let i = 0; i < 200; i++) {
        introStars.push(new IntroStar());
    }
    
    function animateIntroStars() {
        introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
        introCtx.fillStyle = 'rgba(17, 26, 25, 0.1)';
        introCtx.fillRect(0, 0, introCanvas.width, introCanvas.height);
        
        introStars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animateIntroStars);
    }
    
    animateIntroStars();
}

// Function to skip intro screen
function skipIntroScreen() {
    const introScreen = document.getElementById('intro-screen');
    if (!introScreen || introScreen.classList.contains('hidden')) return;
    
    // Stop typing animation by setting flag
    window.introSkipped = true;
    
    // Transition out immediately
    introScreen.classList.add('hidden');
    
    // Trigger hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('slide-in');
        });
    }, 100);
    
    // Remove from DOM after transition
    setTimeout(() => {
        introScreen.style.display = 'none';
    }, 800);
}

// Intro screen typing animation
function typeIntroText() {
    const introScreen = document.getElementById('intro-screen');
    const introText = document.getElementById('intro-text');
    
    if (!introScreen || !introText) return;
    
    // Initialize intro starfield
    initIntroStarfield();
    
    // Add double-click event listener to skip intro
    introScreen.addEventListener('dblclick', skipIntroScreen);
    
    const texts = ['hello', 'hola'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let lastTime = 0;
    let holaFinished = false;
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const pauseTime = 1500;
    
    function type(timestamp) {
        // Check if intro was skipped
        if (window.introSkipped) {
            return;
        }
        
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        
        const current = texts[textIndex];
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        
        if (elapsed >= speed) {
            if (!isDeleting && charIndex < current.length) {
                currentText = current.substring(0, charIndex + 1);
                charIndex++;
                introText.textContent = currentText;
                lastTime = timestamp;
                
                // Check if "hola" is finished typing
                if (textIndex === 1 && charIndex === current.length && !holaFinished) {
                    holaFinished = true;
                    // Wait a brief moment then transition
                    setTimeout(() => {
                        if (!window.introSkipped) {
                            introScreen.classList.add('hidden');
                            // Trigger hero animations
                            setTimeout(() => {
                                const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-buttons');
                                heroElements.forEach((el, index) => {
                                    el.style.animationDelay = `${index * 0.1}s`;
                                    el.classList.add('slide-in');
                                });
                            }, 100);
                            // Remove from DOM after transition
                            setTimeout(() => {
                                introScreen.style.display = 'none';
                            }, 800);
                        }
                    }, 800);
                    return; // Stop animation
                }
            } else if (isDeleting && charIndex > 0) {
                currentText = current.substring(0, charIndex - 1);
                charIndex--;
                introText.textContent = currentText;
                lastTime = timestamp;
            } else if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                lastTime = timestamp + pauseTime;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                lastTime = timestamp + 200;
            }
        }
        
        if (!holaFinished && !window.introSkipped) {
            requestAnimationFrame(type);
        }
    }
    
    // Start typing animation
    requestAnimationFrame(type);
}

// Start intro animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typeIntroText);
} else {
    typeIntroText();
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navlink');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home' || targetId === '#') {
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Handle top of page (home section)
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home' || link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveNav);
});

// Intersection Observer for slide-in animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe about section elements
    const aboutContent = document.querySelector('.about-content');
    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutContent) {
        aboutContent.style.transitionDelay = '0s';
        observer.observe(aboutContent);
    }
    if (aboutPhoto) {
        aboutPhoto.style.transitionDelay = '0.1s';
        observer.observe(aboutPhoto);
    }

    // Observe projects section elements
    const projectsTitle = document.querySelector('.projects-title');
    if (projectsTitle) {
        projectsTitle.style.transitionDelay = '0s';
        observer.observe(projectsTitle);
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${(index + 1) * 0.1}s`;
        observer.observe(card);
    });

    // Observe footer section elements
    const footerTitle = document.querySelector('.footer-title');
    const footerText = document.querySelector('.footer-text');
    const socialLinks = document.querySelector('.social-links');
    const footer = document.querySelector('.footer');
    
    if (footerTitle) {
        footerTitle.style.transitionDelay = '0s';
        observer.observe(footerTitle);
    }
    if (footerText) {
        footerText.style.transitionDelay = '0.1s';
        observer.observe(footerText);
    }
    if (socialLinks) {
        socialLinks.style.transitionDelay = '0.2s';
        observer.observe(socialLinks);
    }
    if (footer) {
        footer.style.transitionDelay = '0.3s';
        observer.observe(footer);
    }
});

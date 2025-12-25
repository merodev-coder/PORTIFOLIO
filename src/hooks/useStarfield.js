import { useEffect, useRef } from 'react';

export const useStarfield = (numStars = 250) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Star class
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        
        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = -2;
        }

        this.twinklePhase += this.twinkleSpeed;
        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        this.currentOpacity = this.opacity * twinkle;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
        ctx.fill();
        
        if (this.size > 1.5) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Resize canvas
    const resizeCanvas = () => {
      const width = window.innerWidth || document.documentElement.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      if (starsRef.current.length > 0) {
        starsRef.current.forEach(star => {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        });
      }
    };

    // Initialize stars
    const initStars = () => {
      resizeCanvas();
      starsRef.current = [];
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push(new Star());
      }
    };

    // Animation loop
    const animate = () => {
      const currentWidth = window.innerWidth || document.documentElement.clientWidth;
      const currentHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (canvas.width !== currentWidth || canvas.height !== currentHeight) {
        resizeCanvas();
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(17, 26, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    initStars();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [numStars]);

  return canvasRef;
};


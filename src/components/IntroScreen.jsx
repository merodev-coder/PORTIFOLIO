import { useState, useEffect, useRef } from 'react';
import { useStarfield } from '../hooks/useStarfield';

const IntroScreen = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const introSkippedRef = useRef(false);
  const canvasRef = useStarfield(200);

  useEffect(() => {
    const texts = ['hello', 'hola'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let lastTime = 0;
    let holaFinished = false;
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const pauseTime = 1500;

    const type = (timestamp) => {
      if (introSkippedRef.current || holaFinished) return;

      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      const current = texts[textIndex];
      const speed = isDeleting ? deleteSpeed : typeSpeed;

      if (elapsed >= speed) {
        if (!isDeleting && charIndex < current.length) {
          setCurrentText(current.substring(0, charIndex + 1));
          charIndex++;
          lastTime = timestamp;

          if (textIndex === 1 && charIndex === current.length && !holaFinished) {
            holaFinished = true;
            setTimeout(() => {
              if (!introSkippedRef.current) {
                setIsVisible(false);
                setTimeout(() => {
                  onComplete();
                }, 800);
              }
            }, 800);
            return;
          }
        } else if (isDeleting && charIndex > 0) {
          setCurrentText(current.substring(0, charIndex - 1));
          charIndex--;
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

      if (!holaFinished && !introSkippedRef.current) {
        requestAnimationFrame(type);
      }
    };

    requestAnimationFrame(type);
  }, [onComplete]);

  const handleSkip = () => {
    introSkippedRef.current = true;
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`intro-screen ${!isVisible ? 'hidden' : ''}`}
      onDoubleClick={handleSkip}
    >
      <canvas 
        ref={canvasRef}
        id="intro-starfield"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      <div className="intro-text" style={{ position: 'relative', zIndex: 2 }}>
        {currentText}
      </div>
    </div>
  );
};

export default IntroScreen;


import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Tarot.css';

export default function SingleCardPicker() {
  const navigate = useNavigate();
  const deckRef = useRef(null);
  const cardsRef = useRef([]);
  const animFrame = useRef(null);
  const startTime = useRef(0);
  const step = useRef(0);
  
  const [isShuffling, setIsShuffling] = useState(false);
  const CARD_COUNT = 12;

  useEffect(() => {
    // Generate Stars
    const starsContainer = document.getElementById('stars');
    if (starsContainer && starsContainer.children.length === 0) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        starsContainer.appendChild(star);
      }
    }
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  const animateShuffle = (now) => {
    const elapsed = (now - startTime.current) / 1000;
    const STEP_DURATION = 1.0;

    if (step.current <= 3) {
      let t = Math.min(elapsed / STEP_DURATION, 1);
      const container = deckRef.current;
      if (!container) return;

      const centerX = (container.clientWidth / 2) - 100;
      const centerY = (350 / 2) - 145;
      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        let x, y, rotate, scale = 1;
        
        if (step.current === 0) {
          x = centerX * (1 - t) + (centerX + (i * 4 - 24)) * t;
          y = (centerY - 5 - i * 0.5) * (1 - t) + (centerY + (i * 2 - 10)) * t;
          rotate = 0 * (1 - t) + (i * 2 - 12) * t;
        } else if (step.current === 1) {
          x = (centerX + (i * 4 - 24)) * (1 - t) + centerX * t;
          y = (centerY + (i * 2 - 10)) * (1 - t) + (centerY - 10) * t;
          rotate = (i * 2 - 12) * (1 - t) + 0 * t;
        } else if (step.current === 2) {
          const side = i % 2 === 0 ? -1 : 1;
          x = centerX * (1 - t) + (centerX + (side * 70)) * t;
          y = (centerY - 10) * (1 - t) + (centerY - 20 + Math.sin(i) * 10) * t;
          rotate = 0 * (1 - t) + (side * 10) * t;
        } else if (step.current === 3) {
          const side = i % 2 === 0 ? -1 : 1;
          const wave = Math.sin(t * Math.PI * 8 + i) * 40;
          x = (centerX + (side * 50)) + wave;
          y = centerY - 20 + Math.cos(t * Math.PI * 6 + i) * 15;
          rotate = side * 8 + Math.sin(t * Math.PI * 10 + i) * 20;
          scale = 0.9 + 0.2 * Math.sin(t * Math.PI * 12 + i);
        }

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
      });

      if (t >= 1) {
        step.current++;
        startTime.current = now;
      }
      animFrame.current = requestAnimationFrame(animateShuffle);
    } else {
      cancelAnimationFrame(animFrame.current);
      setTimeout(() => {
        cardsRef.current.forEach(card => { if (card) card.style.opacity = '0'; });
        setTimeout(() => {
          const randomId = Math.floor(Math.random() * 78) + 1; // 1 to 78
          navigate(`/tarot/single-result/${randomId}`);
        }, 300);
      }, 300);
    }
  };

  const startShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      startTime.current = performance.now();
      animFrame.current = requestAnimationFrame(animateShuffle);
    }, 500);
  };

  return (
    <div className="tarot-body">
      <div className="stars" id="stars"></div>
      <div className="tarot-container">
        <div className="tarot-header">
          <h1>°˖✧ Single Card Reading ✧˖°</h1>
          <p>{isShuffling ? "° Shuffling the mystical deck... °" : "One card holds today's message for you"}</p>
        </div>

        <div className="card-picker-container" ref={deckRef}>
          {!isShuffling && (
            <div className="single-card" onClick={startShuffle}>
              <img src="/assets/images/tarot-back.png" alt="Card Back" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }} />
            </div>
          )}

          <div className={`deck-container ${isShuffling ? 'active' : ''}`}>
            {Array.from({ length: CARD_COUNT }).map((_, i) => (
              <div 
                key={i} 
                className="deck-card" 
                ref={el => cardsRef.current[i] = el}
                style={{ top: 0, left: 0 }}
              >
                <img src="/assets/images/tarot-back.png" alt="Card Back" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }} />
              </div>
            ))}
          </div>
        </div>

        {!isShuffling && <div style={{ color: '#d0b0d0', marginTop: '1rem', fontStyle: 'italic' }}>Click the card to begin</div>}
      </div>
    </div>
  );
}
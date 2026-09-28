import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Tarot.css';

export default function TarotHome() {
  useEffect(() => {
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
      starsContainer.innerHTML = '';
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="tarot-body">
      <div className="stars" id="stars"></div>
      <div className="tarot-container">
        <div className="tarot-header" style={{ marginTop: '10vh' }}>
          <h1 style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px #8a6a4a)' }}>🔮</h1>
          <h1>The Cards of Fate</h1>
          <p>Choose your path to mystic guidance</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/tarot/single" style={{ textDecoration: 'none' }}>
            <div className="info-panel" style={{ textAlign: 'center', width: '300px', cursor: 'pointer' }}>
              <h2 style={{ color: '#d0b0d0', fontFamily: 'Cinzel' }}>Single Card</h2>
              <p style={{ color: '#b59dab', marginTop: '1rem' }}>Draw one card for daily guidance, immediate style inspiration, and quick clarity.</p>
            </div>
          </Link>

          <Link to="/tarot/four" style={{ textDecoration: 'none' }}>
            <div className="info-panel" style={{ textAlign: 'center', width: '300px', cursor: 'pointer' }}>
              <h2 style={{ color: '#d0b0d0', fontFamily: 'Cinzel' }}>Heart, Head & Path</h2>
              <p style={{ color: '#b59dab', marginTop: '1rem' }}>A deep four-card spread revealing inner tensions and guiding your aesthetic journey.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
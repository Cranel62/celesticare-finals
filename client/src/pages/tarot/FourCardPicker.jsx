import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Tarot.css';

const POSITIONS = [
  { id: 'past', title: 'The Past', icon: '📜', question: 'What brought you here?' },
  { id: 'heart', title: 'The Heart', icon: '❤️', question: 'What do you truly feel?' },
  { id: 'head', title: 'The Head', icon: '🧠', question: 'What do you rationally think?' },
  { id: 'path', title: 'The Path', icon: '🛤️', question: 'Where do you go from here?' }
];

export default function FourCardPicker() {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState({ past: null, heart: null, head: null, path: null });
  const [nextPosIndex, setNextPosIndex] = useState(0);
  const [fanOpen, setFanOpen] = useState(false);
  const [activePos, setActivePos] = useState(null);
  const [message, setMessage] = useState('Click on The Past to begin');

  useEffect(() => {
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
  }, []);

  const handlePositionClick = (posId) => {
    if (posId !== POSITIONS[nextPosIndex].id) {
      setMessage(`✨ First complete ${POSITIONS[nextPosIndex].title}`);
      return;
    }
    if (selectedCards[posId]) return;
    
    setActivePos(POSITIONS[nextPosIndex]);
    setFanOpen(true);
  };

  const handleFanCardSelect = (cardId) => {
    const updatedCards = { ...selectedCards, [activePos.id]: cardId };
    setSelectedCards(updatedCards);
    setFanOpen(false);

    if (nextPosIndex + 1 >= POSITIONS.length) {
      setMessage('Your journey is complete... Weaving destiny.');
      sessionStorage.setItem('heartHeadPathSpread', JSON.stringify(updatedCards));
      setTimeout(() => navigate('/tarot/four-result'), 1500);
    } else {
      setNextPosIndex(prev => prev + 1);
      setMessage(`✨ Now choose ${POSITIONS[nextPosIndex + 1].title}`);
    }
  };

  return (
    <div className="tarot-body">
      <div className="stars" id="stars"></div>
      
      <div className="tarot-container">
        <div className="tarot-header">
          <h1>𓆩♡𓆪 Heart, Head & Path 𓆩♡𓆪</h1>
          <p>Four cards will reveal your inner journey</p>
        </div>

        <div className="spread-row">
          {POSITIONS.map((pos, idx) => (
            <div 
              key={pos.id} 
              className={`position-card ${idx === nextPosIndex ? 'active' : ''} ${selectedCards[pos.id] ? 'filled' : ''}`}
              onClick={() => handlePositionClick(pos.id)}
            >
              {selectedCards[pos.id] ? (
                <img src={`/assets/images/Tarots/Major/${selectedCards[pos.id]}.jpg`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Card" onError={(e) => e.target.src='/assets/images/tarot-back.png'}/>
              ) : (
                <>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{pos.icon}</div>
                  <div style={{ fontFamily: 'Cinzel', fontSize: '1.3rem', color: '#c0a0c0' }}>{pos.title}</div>
                  <div style={{ fontSize: '0.9rem', textAlign: 'center', opacity: 0.7, padding: '0 1rem' }}>{pos.question}</div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="progress-indicator">
          {POSITIONS.map((pos, idx) => (
            <div key={idx} className={`progress-dot ${selectedCards[pos.id] ? 'completed' : idx === nextPosIndex ? 'active' : ''}`}></div>
          ))}
        </div>

        <div style={{ fontSize: '1.2rem', color: '#d0b0d0', textAlign: 'center' }}>{message}</div>
      </div>

      {/* Fan Overlay */}
      <div className={`fan-overlay ${fanOpen ? 'active' : ''}`}>
        <button className="fan-close" onClick={() => setFanOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px' }}>✕ Close</button>
        {activePos && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Cinzel', color: '#c0a0c0', fontSize: '2rem' }}>Choose {activePos.title}</h2>
            <p style={{ fontSize: '1.2rem', color: '#fff' }}>{activePos.question}</p>
          </div>
        )}
        <div className="fan-cards-container">
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i - 4.5) * 12; 
            const radians = (angle * Math.PI) / 180;
            const x = Math.sin(radians) * 280;
            const y = -Math.abs(Math.sin(radians) * 35) - 10;
            const rotate = angle * -0.4;
            
            return (
              <div 
                key={i} 
                className="fan-card" 
                style={{ transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg)`, zIndex: i, '--rotate': `${rotate}deg`, animationDelay: `${i * 0.03}s` }}
                onClick={() => handleFanCardSelect(Math.floor(Math.random() * 78) + 1)}
              >
                <img src="/assets/images/tarot-back.png" alt="Back" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
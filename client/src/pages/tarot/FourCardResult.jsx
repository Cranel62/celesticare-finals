import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Tarot.css';

// Include MOCK_TAROT_DB here...
const MOCK_TAROT_DB = {
  default: {
    name: "The Mystical Card",
    upright: "Trust your intuition and logic equally. New beginnings await.",
    keywords: "intuition, mystery, dreams, illusion",
    essence: "A journey of the soul begins.",
    fashion: "Moon phases jewelry, iridescent fabrics, dreamy layers",
    style_tip: "Wear iridescent pieces that shift colors in different light",
    colors: ["#b59dab", "#8a6a9a", "#3a2a3a"],
    challenge: "Overcoming self-doubt and seeing through illusions.",
    opportunity: "Tapping into deep creative reservoirs.",
    ritual: "Light a silver candle and meditate on your true desires.",
    affirmation: "I trust the unseen forces guiding my path.",
    archetype: "The Dreamer",
    myth: "Associated with Artemis and the glowing silver moon.",
    question: "What are you not seeing clearly?",
    advice: "Trust your intuition, even when things aren't clear."
  }
};

export default function FourCardResult() {
  const navigate = useNavigate();
  const [spread, setSpread] = useState(null);

  useEffect(() => {
    const savedSpread = sessionStorage.getItem('heartHeadPathSpread');
    if (!savedSpread) {
      navigate('/tarot/four');
    } else {
      setSpread(JSON.parse(savedSpread));
    }
  }, [navigate]);

  if (!spread) return null;

  const cardData = MOCK_TAROT_DB.default;

  return (
    <div className="tarot-body">
      <div className="tarot-container">
        <div className="tarot-header">
          <h1 style={{ fontFamily: 'Cinzel', fontSize: '3rem', color: '#f0d0f0' }}>☪︎ The Heart, Head & Path ☪︎</h1>
          <p style={{ fontSize: '1.2rem', color: '#d0b0e0' }}>Three voices speak within you. The cards reveal their wisdom.</p>
        </div>

        <div className="spread-grid">
          {Object.entries(spread).map(([pos, id]) => (
            <div key={pos} className="info-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={`/assets/images/Tarots/Major/${id}.jpg`} style={{ width: '120px', borderRadius: '12px', border: '2px solid #c0a0c0' }} alt="Card" onError={e=>e.target.src='/assets/images/tarot-back.png'}/>
              <div>
                <h3 style={{ fontFamily: 'Cinzel', color: '#d0b0d0', textTransform: 'capitalize' }}>The {pos}</h3>
                <h4 style={{ color: '#f0d0f0', fontSize: '1.4rem' }}>Card #{id}</h4>
                <p style={{ color: '#d0b0e0', fontSize: '0.9rem', marginTop: '0.5rem' }}>{cardData.upright}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tension-section">
          <h2 style={{ fontFamily: 'Cinzel', fontSize: '1.8rem', color: '#f0d0f0', marginBottom: '2rem' }}>⚖️ The Inner Dialogue</h2>
          
          <div className="heart-head-container">
            <div style={{ padding: '1.5rem', background: 'rgba(180, 100, 150, 0.15)', border: '1px solid #c06a9a', borderRadius: '18px' }}>
              <div style={{ fontSize: '2.2rem' }}>❤️</div>
              <h3 style={{ color: '#c06a9a', marginTop: '1rem' }}>The Heart</h3>
              <p style={{ color: '#e0c0e0', fontSize: '0.95rem', marginTop: '1rem' }}>Wants: {cardData.keywords.split(',')[0]}</p>
            </div>
            
            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #c06a9a, #6a8ac0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontWeight: 'bold' }}>VS</div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(100, 130, 180, 0.15)', border: '1px solid #6a8ac0', borderRadius: '18px' }}>
              <div style={{ fontSize: '2.2rem' }}>🧠</div>
              <h3 style={{ color: '#6a8ac0', marginTop: '1rem' }}>The Head</h3>
              <p style={{ color: '#e0c0e0', fontSize: '0.95rem', marginTop: '1rem' }}>Thinks: {cardData.keywords.split(',')[1]}</p>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(150, 130, 180, 0.15)', border: '1px solid #9a8ac0', borderRadius: '18px', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem' }}>🛤️</div>
            <h3 style={{ color: '#9a8ac0', marginTop: '1rem' }}>The Path Forward</h3>
            <p style={{ color: '#d0b0d0', fontWeight: 'bold', marginTop: '1rem' }}>The path mirrors your heart. Trust your feelings.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/tarot/four" className="return-button">← New Reading</Link>
          <Link to="/dashboard" className="return-button" style={{ marginLeft: '1rem' }}>Return to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../styles/Tarot.css';

// Complete mock dictionary replacing the PHP $tarot_cards database fetch
const MOCK_TAROT_DB = {
  default: {
    name: "The Moon",
    upright: "Illusion, intuition, subconscious, and dreams.",
    keywords: "intuition, mystery, dreams, illusion",
    essence: "Trust your intuition, even when things aren't clear.",
    challenge: "Overcoming self-doubt and seeing through illusions.",
    opportunity: "Tapping into deep creative reservoirs.",
    ritual: "Light a silver candle and meditate on your true desires.",
    affirmation: "I trust the unseen forces guiding my path.",
    archetype: "The Dreamer",
    myth: "Associated with Artemis and the glowing silver moon.",
    question: "What are you not seeing clearly?",
    advice: "Look beyond the surface; your subconscious holds the answers.",
    shadow_work: "Explore the fears you project onto others. The Moon asks you to sit with your discomfort until it becomes a familiar friend.",
    soul_question: "What secret is my soul trying to whisper to me in the dark?",
    fashion: "Moon phases jewelry, iridescent fabrics, dreamy layers.",
    colors: ["#b59dab", "#8a6a9a", "#3a2a3a"],
    color_hexes: "#c0c0c0, #483D8B, #191970",
    style_tip: "Wear iridescent pieces that shift colors in different light.",
    style_challenge: "Incorporate a piece of silver jewelry you rarely wear.",
    morning: "The morning mist hides the path, but your inner compass is true.",
    afternoon: "Daylight reveals what the night concealed. Trust your insights.",
    evening: "As shadows lengthen, your intuitive powers are at their peak."
  }
};

export default function SingleCardResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEntrance, setShowEntrance] = useState(true);
  const [entranceFading, setEntranceFading] = useState(false);
  const [timeData, setTimeData] = useState({ period: 'mystical', message: '' });

  const cardData = MOCK_TAROT_DB[id] || MOCK_TAROT_DB.default;
  const token = localStorage.getItem('celesticare_token');

  // Entrance Animation & Time Calculation
  useEffect(() => {
    // Determine Time of Day
    const hour = new Date().getHours();
    let period = 'evening';
    if (hour < 12) period = 'morning';
    else if (hour < 18) period = 'afternoon';
    
    setTimeData({
      period,
      message: cardData[period] || cardData.essence
    });

    // Handle Entrance Fade Sequence
    const fadeTimer = setTimeout(() => {
      setEntranceFading(true);
      const removeTimer = setTimeout(() => {
        setShowEntrance(false);
      }, 1200);
      return () => clearTimeout(removeTimer);
    }, 1500);

    // Auto-Save Reading Mock
    if (token) {
      const readingData = {
        reading_type: 'single',
        cards: [{ id: id, name: cardData.name }],
        interpretation: cardData.upright
      };
      sessionStorage.setItem('last_reading_type', 'single');
      sessionStorage.setItem('last_single_reading', JSON.stringify(readingData));
    }

    return () => clearTimeout(fadeTimer);
  }, [id, cardData, token]);

  const colors = cardData.color_hexes 
    ? cardData.color_hexes.split(',').map(c => c.trim()) 
    : cardData.colors;

  return (
    <div className="tarot-body">
      <div className="stars" id="stars"></div>

      {/* Entrance Card Animation */}
      {showEntrance && (
        <div className={`card-entrance ${entranceFading ? 'fade-out' : ''}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '320px', zIndex: 1000, transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div className="mystical-card entrance-card" style={{ padding: 0, overflow: 'hidden', width: '100%', aspectRatio: '2/3', background: '#1a0f1a', borderRadius: '24px', border: '3px solid #b59dab', boxShadow: '0 40px 80px rgba(180,130,200,0.4)' }}>
            <img src={`/assets/images/Tarots/Major/${id || 18}.jpg`} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.src = '/assets/images/tarot-back.png'; e.target.style.objectFit = 'cover'; }} />
          </div>
        </div>
      )}

      <div className="reading-layout" style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', gap: '3rem', position: 'relative', zIndex: 2 }}>
        
        {/* LEFT COLUMN - Static Card */}
        <div className="card-column" style={{ flex: '0 0 320px' }}>
          <div className="card-static" style={{ opacity: showEntrance ? 0 : 1, animation: showEntrance ? 'none' : 'cardAppear 0.8s ease forwards' }}>
            <div className="mystical-card" style={{ padding: 0, overflow: 'hidden', background: '#1a0f1a', width: '100%', aspectRatio: '2/3', borderRadius: '24px', border: '3px solid #8a6a9a', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <img src={`/assets/images/Tarots/Major/${id || 18}.jpg`} alt={cardData.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.src = '/assets/images/tarot-back.png'; e.target.style.objectFit = 'cover'; }} />
            </div>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: '#b59dab', fontSize: '1rem', lineHeight: 1.6 }}>
              "{cardData.essence}"
            </div>
            {token && (
              <div style={{ textAlign: 'center', marginTop: '1rem', padding: '0.5rem', background: 'rgba(138, 106, 154, 0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#b59dab', border: '1px dashed #8a6a9a' }}>
                📜 Saved reading from today
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - Info panels */}
        <div className="info-column" style={{ flex: 1, paddingRight: '1rem', opacity: showEntrance ? 0 : 1, animation: showEntrance ? 'none' : 'fadeInContent 1s ease forwards' }}>
          
          {/* Time Message */}
          <div className="info-panel time-panel" style={{ borderLeft: '4px solid #b59dab', background: 'linear-gradient(135deg, rgba(138, 106, 154, 0.15), rgba(98, 76, 114, 0.15))' }}>
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', borderBottom: '1px solid rgba(138, 106, 154, 0.3)', paddingBottom: '0.8rem' }}>
              <span className="panel-icon">⌛</span>
              <span className="panel-title" style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', fontWeight: 600, color: '#d0b0d0' }}>This {timeData.period.charAt(0).toUpperCase() + timeData.period.slice(1)}</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#e0c9d5' }}>{timeData.message}</div>
          </div>

          {/* Core Meaning */}
          <div className="info-panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', borderBottom: '1px solid rgba(138, 106, 154, 0.3)', paddingBottom: '0.8rem' }}>
              <span className="panel-icon">📋</span>
              <span className="panel-title" style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', fontWeight: 600, color: '#d0b0d0' }}>Meaning</span>
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#d0c0d0' }}>{cardData.upright}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.2rem 0' }}>
              {cardData.keywords.split(',').map((kw, i) => (
                <span key={i} style={{ background: 'rgba(138, 106, 154, 0.15)', padding: '0.4rem 1.2rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 500, color: '#c0a0c0', border: '1px solid rgba(138, 106, 154, 0.3)' }}>
                  {kw.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Challenge & Opportunity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
            <div style={{ padding: '1.2rem', borderRadius: '16px', textAlign: 'center', background: 'rgba(170, 90, 110, 0.1)', border: '1px solid rgba(170, 90, 110, 0.3)' }}>
              <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem', fontWeight: 500 }}>Challenge</div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{cardData.challenge}</div>
            </div>
            <div style={{ padding: '1.2rem', borderRadius: '16px', textAlign: 'center', background: 'rgba(90, 130, 170, 0.1)', border: '1px solid rgba(90, 130, 170, 0.3)' }}>
              <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem', fontWeight: 500 }}>Opportunity</div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{cardData.opportunity}</div>
            </div>
          </div>

          {/* Ritual & Affirmation */}
          <div style={{ background: 'rgba(138, 106, 154, 0.1)', border: '1px dashed #8a6a9a', borderRadius: '20px', padding: '1.8rem', textAlign: 'center', margin: '1.5rem 0' }}>
            <div style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.7 }}>{cardData.ritual}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(138, 106, 154, 0.1)', borderRadius: '20px', margin: '1rem 0' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'Playfair Display', lineHeight: 1.5 }}>"{cardData.affirmation}"</div>
          </div>

          {/* Archetype & Myth */}
          <div className="info-panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', borderBottom: '1px solid rgba(138, 106, 154, 0.3)', paddingBottom: '0.8rem' }}>
              <span className="panel-icon">🏛️</span>
              <span className="panel-title" style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', fontWeight: 600, color: '#d0b0d0' }}>Archetype</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0' }}>
              {cardData.archetype.split(',').map((arch, i) => (
                <span key={i} style={{ background: 'rgba(138, 106, 154, 0.15)', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid rgba(138, 106, 154, 0.3)' }}>
                  {arch.trim()}
                </span>
              ))}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderLeft: '3px solid #8a6a9a', padding: '1.2rem', margin: '1.2rem 0', fontStyle: 'italic', borderRadius: '0 12px 12px 0' }}>
              {cardData.myth}
            </div>
          </div>

          {/* Fashion & Style */}
          <div className="info-panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', borderBottom: '1px solid rgba(138, 106, 154, 0.3)', paddingBottom: '0.8rem' }}>
              <span className="panel-icon">👚</span>
              <span className="panel-title" style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', fontWeight: 600, color: '#d0b0d0' }}>Style</span>
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#d0c0d0' }}>{cardData.fashion}</div>
            
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(138, 106, 154, 0.3)', paddingTop: '1.2rem' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', color: '#d0b0d0', textAlign: 'center', marginBottom: '1rem' }}>🎨 Color Palette</div>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {colors.map((hex, i) => (
                  <div key={i} style={{ width: '70px', height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '0.5rem', backgroundColor: hex, overflow: 'hidden' }}>
                    <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: 'monospace', fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{hex}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontStyle: 'italic', color: '#b59dab', margin: '1rem 0', fontSize: '0.95rem', textAlign: 'center' }}>{cardData.style_tip}</div>
              <div style={{ background: 'rgba(138, 106, 154, 0.1)', border: '1px dashed #8a6a9a', padding: '1rem', borderRadius: '16px', textAlign: 'center', fontSize: '0.95rem', marginTop: '1rem' }}>
                {cardData.style_challenge}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ textAlign: 'center', margin: '2.5rem 0' }}>
            <Link to="/tarot/single" className="return-button">← New Reading</Link>
            {token && <Link to="/dashboard" className="return-button" style={{ marginLeft: '1rem' }}>Return to Dashboard</Link>}
          </div>

        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import '../styles/AstroView.css';

// --- DATA DICTIONARIES PORTED FROM PHP ---
const ELEMENTS = ['fire', 'water', 'air', 'earth'];

const ELEMENT_LABEL = {
  fire: 'Fire Signs',
  water: 'Water Signs',
  air: 'Air Signs',
  earth: 'Earth Signs'
};

const ELEMENT_SIGNS = {
  fire: ['aries', 'leo', 'sagittarius'],
  water: ['cancer', 'scorpio', 'pisces'],
  air: ['gemini', 'libra', 'aquarius'],
  earth: ['taurus', 'virgo', 'capricorn'],
};

const ELEMENT_BG = {
  fire: 'fire_bg.jpeg',
  water: 'water_bg.jpeg',
  air: 'air_bg.jpeg',
  earth: 'earth_bg.jpeg'
};

const SIGN_DATA = {
  aries: { name: 'Aries', element: 'fire', tagline: 'The Fiery', dates: 'March 21 – April 19', traits: 'Bold, dynamic, and unafraid to take charge. Aries ignites movement wherever they go, driven by pure enthusiasm. Passion and courage define their leadership style.', element_desc: 'Energy, vitality, and initiative.', planet: 'Mars', planet_desc: 'The planet of action and strength.', bg: 'fire_bg.jpeg', icon: 'aries.png' },
  leo: { name: 'Leo', element: 'fire', tagline: 'The Blazing Feline', dates: 'July 23 – August 22', traits: 'Charismatic, confident, and warm-hearted. Leo lives to express and uplift, bringing light to every space they enter. Their generosity and creativity make them unforgettable.', element_desc: 'Passion, self-expression, and pride.', planet: 'Sun', planet_desc: 'The ruler of vitality and purpose.', bg: 'fire_bg.jpeg', icon: 'leo.png' },
  sagittarius: { name: 'Sagittarius', element: 'fire', tagline: 'The Adventurous', dates: 'November 22 – December 21', traits: 'Adventurous, optimistic, and endlessly curious. Sagittarius seeks meaning through exploration, learning, and laughter. Their joy inspires others to look beyond limits.', element_desc: 'Growth, vision, and enthusiasm.', planet: 'Jupiter', planet_desc: 'The planet of expansion and wisdom.', bg: 'fire_bg.jpeg', icon: 'sagittarius.png' },
  taurus: { name: 'Taurus', element: 'earth', tagline: 'The Grounded', dates: 'April 20 – May 20', traits: 'Loyal, sensual, and steadfast. Taurus finds peace in beauty and stability, creating comfort that lasts. Their calm nature anchors everyone around them.', element_desc: 'Practicality, security, and endurance.', planet: 'Venus', planet_desc: 'The planet of love and pleasure.', bg: 'earth_bg.jpeg', icon: 'taurus.png' },
  virgo: { name: 'Virgo', element: 'earth', tagline: 'The Maiden', dates: 'August 23 – September 22', traits: 'Intelligent, detail-oriented, and quietly powerful. Virgo refines and improves everything they touch. Their thoughtful nature brings structure to chaos with grace.', element_desc: 'Precision, purpose, and balance.', planet: 'Mercury', planet_desc: 'The planet of logic and service.', bg: 'earth_bg.jpeg', icon: 'virgo.png' },
  capricorn: { name: 'Capricorn', element: 'earth', tagline: 'The Ambitious', dates: 'December 22 – January 19', traits: 'Ambitious, responsible, and disciplined. Capricorn climbs steadily toward mastery, blending wisdom with willpower. They are builders of both success and legacy.', element_desc: 'Stability, focus, and determination.', planet: 'Saturn', planet_desc: 'The ruler of time, structure, and perseverance.', bg: 'earth_bg.jpeg', icon: 'capricorn.png' },
  gemini: { name: 'Gemini', element: 'air', tagline: 'The Versatile', dates: 'May 21 – June 20', traits: 'Quick-witted, adaptable, and endlessly curious. Gemini thrives on movement and conversation, forever gathering stories and insights. Their lively presence keeps energy flowing.', element_desc: 'Intellect, communication, and change.', planet: 'Mercury', planet_desc: 'The planet of thought and expression.', bg: 'air_bg.jpeg', icon: 'gemini.png' },
  libra: { name: 'Libra', element: 'air', tagline: 'The Harmonizer', dates: 'September 23 – October 22', traits: 'Graceful, charming, and fair. Libra seeks equilibrium in beauty and relationships. They bring peace through empathy and elegant compromise.', element_desc: 'Balance, elegance, and awareness.', planet: 'Venus', planet_desc: 'Ruler of love, art, and diplomacy.', bg: 'air_bg.jpeg', icon: 'libra.png' },
  aquarius: { name: 'Aquarius', element: 'air', tagline: 'The Innovator', dates: 'January 20 – February 18', traits: 'Innovative, independent, and forward-thinking. Aquarius lives for originality and ideas that serve humanity. Their perspective is futuristic, yet deeply humanitarian.', element_desc: 'Intellect, innovation, and freedom.', planet: 'Uranus', planet_desc: 'Planet of progress and change (traditionally Saturn).', bg: 'air_bg.jpeg', icon: 'aquarius.png' },
  cancer: { name: 'Cancer', element: 'water', tagline: 'The Nurturer', dates: 'June 21 – July 22', traits: 'Sensitive, protective, and nurturing. Cancer builds emotional safety for themselves and their loved ones. They love through care, creating homes filled with warmth.', element_desc: 'Emotion, intuition, and protection.', planet: 'Moon', planet_desc: 'Ruler of feeling, memory, and instinct.', bg: 'water_bg.jpeg', icon: 'cancer.png' },
  scorpio: { name: 'Scorpio', element: 'water', tagline: 'The Intense', dates: 'October 23 – November 21', traits: 'Mysterious, passionate, and deeply loyal. Scorpio transforms pain into power and truth into intimacy. They live and love with unshakable intensity.', element_desc: 'Depth, passion, and renewal.', planet: 'Pluto', planet_desc: 'Ruler of transformation and desire (traditionally Mars).', bg: 'water_bg.jpeg', icon: 'scorpio.png' },
  pisces: { name: 'Pisces', element: 'water', tagline: 'The Whimsical', dates: 'February 19 – March 20', traits: 'Empathetic, creative, and soulful. Pisces channels emotion into imagination, seeing beauty where others see chaos. They live through intuition and compassion.', element_desc: 'Sensitivity, art, and spirituality.', planet: 'Neptune', planet_desc: 'Planet of dreams and inspiration (traditionally Jupiter).', bg: 'water_bg.jpeg', icon: 'pisces.png' },
};

export default function AstroView() {
  const [view, setView] = useState('element'); // 'element' or 'sign'
  const [activeElem, setActiveElem] = useState('fire');
  const [activeSign, setActiveSign] = useState(null);
  const [fade, setFade] = useState(false);

  // Derive current data based on state
  const bgImage = view === 'sign' ? SIGN_DATA[activeSign].bg : ELEMENT_BG[activeElem];
  const bodyClass = view === 'sign' ? SIGN_DATA[activeSign].element : activeElem;

  // Fade transitions
  const handleTransition = (callback) => {
    setFade(true);
    setTimeout(() => {
      callback();
      setFade(false);
    }, 400); // 400ms CSS transition timeout
  };

  const handleNextElem = () => {
    const currentIndex = ELEMENTS.indexOf(activeElem);
    const nextElem = ELEMENTS[(currentIndex + 1) % ELEMENTS.length];
    handleTransition(() => {
      setActiveElem(nextElem);
      setView('element');
    });
  };

  const handlePrevElem = () => {
    const currentIndex = ELEMENTS.indexOf(activeElem);
    const prevElem = ELEMENTS[(currentIndex - 1 + ELEMENTS.length) % ELEMENTS.length];
    handleTransition(() => {
      setActiveElem(prevElem);
      setView('element');
    });
  };

  const handleViewSign = (slug) => {
    handleTransition(() => {
      setActiveSign(slug);
      setView('sign');
    });
  };

  const handleBackToElem = (elem) => {
    handleTransition(() => {
      setActiveElem(elem);
      setView('element');
    });
  };

  return (
    <div 
      className={`astro-explore-body ${bodyClass}`} 
      style={{ backgroundImage: `url('/assets/images/${bgImage}')` }}
    >
      <div className={`page-overlay ${fade ? 'fade-out' : ''}`}>
        
        {view === 'element' ? (
          <main className="astro-main" style={{ paddingTop: '160px' }}>
            <h2>{ELEMENT_LABEL[activeElem]}</h2>
            
            <div className="astro-arrow left" onClick={handlePrevElem}>←</div>

            <div className="diamond-container">
              {ELEMENT_SIGNS[activeElem].map((slug) => {
                const sd = SIGN_DATA[slug];
                return (
                  <div key={slug} className={`diamond-wrapper ${slug}`}>
                    <div className="diamond-images" onClick={() => handleViewSign(slug)}>
                      <img src="/assets/images/vector.png" alt="Vector Background" className="vector-bg" />
                      <img 
                        src={`/assets/icons/zodiac/${sd.icon}`} 
                        alt={sd.name} 
                        className="zodiac-icon"
                        onError={(e) => { e.target.src = '/assets/icons/zodiac/fallback.png'; }}
                      />
                      <span className="sign-name">{sd.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="astro-arrow right" onClick={handleNextElem}>→</div>
          </main>
        ) : (
          <main className="sign-page">
            <div className="sign-card">
              <h1 className="sign-title">{SIGN_DATA[activeSign].name}</h1>
              <div className="sign-tagline">{SIGN_DATA[activeSign].tagline}</div>
              <div className="sign-dates">{SIGN_DATA[activeSign].dates}</div>

              <section className="sign-section">
                <h3>Core Traits</h3>
                <p>{SIGN_DATA[activeSign].traits}</p>
              </section>

              <section className="sign-section">
                <h3>Element</h3>
                <p>
                  <strong style={{textTransform: 'capitalize'}}>{SIGN_DATA[activeSign].element}</strong> — {SIGN_DATA[activeSign].element_desc}
                </p>
              </section>

              <section className="sign-section">
                <h3>Planet</h3>
                <p><strong>{SIGN_DATA[activeSign].planet}</strong> — {SIGN_DATA[activeSign].planet_desc}</p>
              </section>

              <div className="sign-actions">
                <button className="astro-cta" onClick={() => handleBackToElem(SIGN_DATA[activeSign].element)}>
                  Back to {SIGN_DATA[activeSign].element} signs
                </button>
                <button className="astro-cta" onClick={() => handleBackToElem('fire')}>
                  All Elements
                </button>
              </div>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}
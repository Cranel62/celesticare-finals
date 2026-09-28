import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Undertone.css';

export default function UndertoneTest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelection = (tone) => {
    setLoading(true);
    const data = JSON.parse(localStorage.getItem('celesticare_onboarding') || '{}');
    data.undertone = tone;
    localStorage.setItem('celesticare_onboarding', JSON.stringify(data));

    setTimeout(() => {
      navigate('/undertone-result');
    }, 800);
  };

  return (
    <div className="ut-body">
      <div className="ut-quiz-box">
        <h1>Let's know your undertone</h1>
        <p>Check the color of your veins on your wrist and tap the image that matches your skin tone.</p>

        <div className="ut-images">
          <div className="ut-image-wrapper" onClick={() => handleSelection('cool')}>
            <div className="ut-image-option" style={{ backgroundImage: "url('/assets/images/cool_skin.png')" }}></div>
            <div className="ut-label">Cool</div>
          </div>
          <div className="ut-image-wrapper" onClick={() => handleSelection('neutral')}>
            <div className="ut-image-option" style={{ backgroundImage: "url('/assets/images/neutral_skin.png')" }}></div>
            <div className="ut-label">Neutral</div>
          </div>
          <div className="ut-image-wrapper" onClick={() => handleSelection('warm')}>
            <div className="ut-image-option" style={{ backgroundImage: "url('/assets/images/warm_skin.png')" }}></div>
            <div className="ut-label">Warm</div>
          </div>
        </div>

        <div className="ut-notes">
          <div className="ut-note">• Use daylight for best accuracy to see your vein color clearly.</div>
          <div className="ut-note">• Gold jewelry suits warm undertones, silver suits cool. Both look good? You may be neutral.</div>
        </div>
      </div>

      {loading && (
        <div className="ut-loader-overlay">
          <div className="ut-spinner-box">
            <div className="ut-spinner"></div>
            <p>Analyzing your undertone...</p>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const ALL_IMAGES = [
  { src: "acad1.jpg", aesthetic: "academia" }, { src: "acad2.jpg", aesthetic: "academia" }, { src: "acad3.jpg", aesthetic: "academia" },
  { src: "boho1.jpg", aesthetic: "boho" }, { src: "boho2.jpg", aesthetic: "boho" }, { src: "boho3.jpg", aesthetic: "boho" },
  { src: "coquette12.jpg", aesthetic: "coquette" }, { src: "coquette2.jpg", aesthetic: "coquette" }, { src: "coquette3.jpg", aesthetic: "coquette" },
  { src: "glam1.jpg", aesthetic: "luxurious" }, { src: "glam2.jpg", aesthetic: "luxurious" }, { src: "glam3.jpg", aesthetic: "luxurious" },
  { src: "grunge1.jpg", aesthetic: "grunge" }, { src: "grunge2.jpg", aesthetic: "grunge" }, { src: "grunge3.jpg", aesthetic: "grunge" },
  { src: "punk1.jpg", aesthetic: "punk" }, { src: "punk2.jpg", aesthetic: "punk" }, { src: "punk3.jpg", aesthetic: "punk" },
  { src: "y2k1.jpg", aesthetic: "y2k" }, { src: "y2k2.jpg", aesthetic: "y2k" }, { src: "y2k3.jpg", aesthetic: "y2k" }
].map(img => ({ ...img, src: `/assets/images/quizzes/${img.src}` }));

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function AestheticQuiz() {
  const navigate = useNavigate();
  const [imageSets, setImageSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scores, setScores] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(ALL_IMAGES);
    const sets = [];
    for (let i = 0; i < 6; i++) {
      sets.push(shuffled.slice(i * 3, i * 3 + 3));
    }
    setImageSets(sets);
  }, []);

  const handleNext = async () => {
    if (!selectedImage) return;

    // Record score
    const newScores = { ...scores, [selectedImage.aesthetic]: (scores[selectedImage.aesthetic] || 0) + 1 };
    setScores(newScores);
    setSelectedImage(null);

    if (currentSet < 5) {
      setIsFlipped(!isFlipped);
      setTimeout(() => setCurrentSet(prev => prev + 1), 300); // Wait for flip animation
    } else {
      // Calculate final result
      const maxScore = Math.max(...Object.values(newScores));
      const topAesthetics = Object.keys(newScores).filter(a => newScores[a] === maxScore);
      const finalAesthetic = topAesthetics[Math.floor(Math.random() * topAesthetics.length)];
      
      try {
        // Save to backend replacing api_save_aesthetic.php
        await API.post('/auth/update-aesthetic', { aesthetic_result: finalAesthetic });
        
        // Update local storage user object
        const user = JSON.parse(localStorage.getItem('celesticare_user'));
        user.aesthetic_result = finalAesthetic;
        localStorage.setItem('celesticare_user', JSON.stringify(user));
        
        navigate(`/aesthetic-result/${finalAesthetic}`);
      } catch (err) {
        console.error('Failed to save aesthetic:', err);
        navigate(`/aesthetic-result/${finalAesthetic}`); // Navigate anyway
      }
    }
  };

  if (imageSets.length === 0) return null;

  return (
    <div style={{ minHeight: 'calc(100vh - 100px)', background: 'linear-gradient(135deg, #d3cce3 0%, #ad83e8 100%)', display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <div style={{ background: 'rgba(0, 0, 0, 0.85)', borderRadius: '25px', width: '90%', maxWidth: '1000px', minHeight: '500px', padding: '30px', textAlign: 'center', color: '#fff', transform: isFlipped ? 'rotateY(180deg)' : 'none', transition: 'transform 0.6s ease' }}>
        <div style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none', transition: 'transform 0s' }}>
          <h2 style={{ marginBottom: '25px', fontFamily: 'Poppins' }}>Pick the Image that Speaks to You ({currentSet + 1}/6)</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', justifyItems: 'center' }}>
            {imageSets[currentSet].map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '230px', aspectRatio: '1/1', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                  border: selectedImage === img ? '3px solid #6b5b95' : '3px solid transparent',
                  transform: selectedImage === img ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <img src={img.src} alt="Aesthetic Choice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          <button 
            disabled={!selectedImage}
            onClick={handleNext}
            style={{ marginTop: '30px', background: '#6b5b95', color: '#fff', border: 'none', borderRadius: '35px', padding: '14px 50px', fontSize: '1.1rem', cursor: selectedImage ? 'pointer' : 'not-allowed', opacity: selectedImage ? 1 : 0.6 }}
          >
            {currentSet === 5 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
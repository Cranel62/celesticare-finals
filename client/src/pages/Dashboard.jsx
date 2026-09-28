import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/Dashboard.css';

// --- DATA DICTIONARIES PORTED FROM PHP ---
const zodiacDetails = {
  Aries: { personality: "Energetic, bold, confident, and adventurous.", element: "Fire", planet: "Mars", lucky_numbers: "1, 9, 14", strengths: "Courageous, passionate, determined", weaknesses: "Impulsive, impatient, short-tempered", traits: "Aries is about action and leadership.", compatibility: "Best matches with Leo and Sagittarius." },
  Taurus: { personality: "Patient, reliable, practical, and loving.", element: "Earth", planet: "Venus", lucky_numbers: "2, 6, 9", strengths: "Loyal, persistent, trustworthy", weaknesses: "Stubborn, possessive, resistant to change", traits: "Taurus values comfort and stability.", compatibility: "Best matches with Virgo and Capricorn." },
  Gemini: { personality: "Curious, adaptable, witty, and sociable.", element: "Air", planet: "Mercury", lucky_numbers: "3, 5, 7", strengths: "Intelligent, expressive, versatile", weaknesses: "Inconsistent, indecisive, restless", traits: "Gemini thrives on communication and learning.", compatibility: "Best matches with Libra and Aquarius." },
  Cancer: { personality: "Emotional, caring, protective, and intuitive.", element: "Water", planet: "Moon", lucky_numbers: "2, 7, 11", strengths: "Loyal, empathetic, nurturing", weaknesses: "Moody, sensitive, clingy", traits: "Cancer values home, family, and emotional security.", compatibility: "Best matches with Scorpio and Pisces." },
  Leo: { personality: "Confident, charismatic, generous, and creative.", element: "Fire", planet: "Sun", lucky_numbers: "1, 3, 10", strengths: "Ambitious, warm-hearted, loyal", weaknesses: "Arrogant, stubborn, attention-seeking", traits: "Leo loves to shine and lead.", compatibility: "Best matches with Aries and Sagittarius." },
  Virgo: { personality: "Practical, analytical, reliable, and modest.", element: "Earth", planet: "Mercury", lucky_numbers: "5, 14, 23", strengths: "Detail-oriented, hardworking, intelligent", weaknesses: "Overcritical, perfectionist, anxious", traits: "Virgo is focused on improvement and organization.", compatibility: "Best matches with Taurus and Capricorn." },
  Libra: { personality: "Charming, fair-minded, diplomatic, and sociable.", element: "Air", planet: "Venus", lucky_numbers: "6, 15, 24", strengths: "Cooperative, graceful, balanced", weaknesses: "Indecisive, people-pleasing, superficial", traits: "Libra values harmony and beauty.", compatibility: "Best matches with Gemini and Aquarius." },
  Scorpio: { personality: "Passionate, mysterious, determined, and resourceful.", element: "Water", planet: "Pluto (and Mars)", lucky_numbers: "8, 11, 18", strengths: "Loyal, brave, intuitive", weaknesses: "Jealous, secretive, controlling", traits: "Scorpio is about transformation, depth, and emotional power.", compatibility: "Best matches with Cancer and Pisces." },
  Sagittarius: { personality: "Adventurous, optimistic, honest, and free-spirited.", element: "Fire", planet: "Jupiter", lucky_numbers: "3, 9, 12", strengths: "Enthusiastic, open-minded, idealistic", weaknesses: "Impulsive, blunt, inconsistent", traits: "Sagittarius seeks knowledge and adventure.", compatibility: "Best matches with Aries and Leo." },
  Capricorn: { personality: "Ambitious, disciplined, responsible, and patient.", element: "Earth", planet: "Saturn", lucky_numbers: "4, 8, 22", strengths: "Practical, hardworking, dependable", weaknesses: "Pessimistic, rigid, workaholic", traits: "Capricorn strives for success and stability.", compatibility: "Best matches with Taurus and Virgo." },
  Aquarius: { personality: "Innovative, original, independent, humanitarian.", element: "Air", planet: "Uranus", lucky_numbers: "2, 7, 11", strengths: "Innovative, idealistic, independent", weaknesses: "Unpredictable, aloof, stubborn", traits: "Aquarius is about innovation, individuality, and humanitarian causes.", compatibility: "Best matches with Gemini and Libra." },
  Pisces: { personality: "Compassionate, artistic, gentle, and empathetic.", element: "Water", planet: "Neptune", lucky_numbers: "3, 9, 12", strengths: "Imaginative, kind, intuitive", weaknesses: "Escapist, overly trusting, emotional", traits: "Pisces is deeply connected to dreams and emotions.", compatibility: "Best matches with Cancer and Scorpio." }
};

const aesthetics = {
  academia: { title: "The Scholar", side1: "/assets/images/acad_bg2.jpg", color: "#271a0eff" },
  boho: { title: "The Bohemian Dreamer", side1: "/assets/images/boho1.jpg", color: "#e38153ff" },
  coquette: { title: "The Coquette Muse", side1: "/assets/images/coquette2.jpg", color: "#f5c4d4" },
  grunge: { title: "The Rebel Soul", side1: "/assets/images/grunge2.jpg", color: "#a1a1a1ff" },
  punk: { title: "The Anarchic Icon", side1: "/assets/images/punk_bg2.jpg", color: "#ff0000ff" },
  y2k: { title: "The Futuristic Popstar", side1: "/assets/images/y2k2.jpg", color: "#d46be3" },
  luxurious: { title: "The Luxe Visionary", side1: "/assets/images/glam2.jpg", color: "#c93939ff" }
};

const palettes = {
  Warm: ["#E69A5B", "#F5C16C", "#D76A03", "#C25B02", "#FFD27F"],
  Cool: ["#5B7BE6", "#A3C1F7", "#7089E3", "#4059C2", "#9EB8FF"],
  Neutral: ["#D7BFAE", "#C1B3A4", "#A8988B", "#8B7C6F", "#BFA98B"]
};

const styleInfo = {
  minimalist: { name: 'Minimalist Elegance', color: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', text_color: '#374151' },
  businesswear: { name: 'Professional Businesswear', color: 'linear-gradient(135deg, #1e3a8a, #3730a3)', text_color: '#ffffff' },
  elegant: { name: 'Classic Elegance', color: 'linear-gradient(135deg, #7e22ce, #c084fc)', text_color: '#ffffff' },
  creative: { name: 'Creative Expression', color: 'linear-gradient(135deg, #ea580c, #f59e0b)', text_color: '#ffffff' },
  soft: { name: 'Soft Elegance', color: 'linear-gradient(135deg, #f9a8d4, #f472b6)', text_color: '#ffffff' },
  rough: { name: 'Rough Edge', color: 'linear-gradient(135deg, #4b5563, #6b7280)', text_color: '#ffffff' },
  streetwear: { name: 'Urban Streetwear', color: 'linear-gradient(135deg, #000000, #374151)', text_color: '#ffffff' }
};

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('celesticare_user') || '{}'));
  const [formData, setFormData] = useState({ name: user.name || '', gender: user.gender || '', birthdate: user.birthdate || '' });

  // Default empty states
  const zData = zodiacDetails[user.zodiac_sign] || {
    personality: "Complete your zodiac profile to unlock your astro details!",
    element: "Not set", planet: "Not set", lucky_numbers: "Not set", strengths: "Not set", weaknesses: "Not set", traits: "Complete your zodiac profile to unlock your astro details!", compatibility: "Not set"
  };

  const hasMoodboard = user.aesthetic_result && user.style_result;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // In production, you would post formData to an endpoint like API.put('/auth/profile', formData)
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('celesticare_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      // Close Bootstrap modal programmatically if needed
      document.querySelector('#editProfileModal .btn-close')?.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="dashboard-container">
        <div className="dashboard-card shadow-sm">
          
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h2 className="mb-1">The Universe Welcomes your presence, {user.username || user.name}!</h2>
              <p className="mb-0 text-muted">This is your profile dashboard where your zodiac style journey begins.</p>
            </div>
            <div className="d-flex flex-column align-items-end gap-2">
              <button className="btn" data-bs-toggle="modal" data-bs-target="#editProfileModal" style={{ borderRadius: '30px', padding: '10px 25px', backgroundColor: '#7A3DA1', color: 'white' }}>
                <i className="fas fa-edit me-2"></i> Edit Profile
              </button>
              
              {!user.security_setup_complete && (
                <Link to="/security-setup" className="btn btn-warning position-relative" style={{ borderRadius: '30px', padding: '5px 15px', color: '#2e2e2e', fontWeight: '500' }}>
                  <i className="fas fa-shield-alt me-2"></i> Secure Account
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.5rem' }}>
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                </Link>
              )}
            </div>
          </div>

          <div className="grid-container">
            {/* PROFILE SECTION */}
            <div className="profile-section">
              <div className="section-title">Profile</div>
              <div className="profile-info">
                <div className="profile-item"><span className="profile-label">Name:</span><span className="profile-value">{user.name || 'Not set'}</span></div>
                <div className="profile-item"><span className="profile-label">Username:</span><span className="profile-value">{user.username || 'Not set'}</span></div>
                <div className="profile-item"><span className="profile-label">Email:</span><span className="profile-value">{user.email}</span></div>
                <div className="profile-item"><span className="profile-label">Gender:</span><span className="profile-value">{user.gender || 'Not set'}</span></div>
                <div className="profile-item"><span className="profile-label">Birthdate:</span><span className="profile-value">{user.birthdate || 'Not set'}</span></div>
                <div className="profile-item"><span className="profile-label">Zodiac:</span><span className="profile-value">{user.zodiac_sign || 'Not set'}</span></div>
              </div>
            </div>

            {/* ASTRO SECTION */}
            <div className="astro-section">
              <div className="section-title">Astro Insights</div>
              <div className="zodiac-header">
                <div className="zodiac-name">Your Zodiac Sign: {user.zodiac_sign || 'Unknown'}</div>
              </div>
              <div className="zodiac-details">
                <div className="zodiac-detail-item"><span className="zodiac-label">Personality:</span><span className="zodiac-value">{zData.personality}</span></div>
                <div className="zodiac-detail-item"><span className="zodiac-label">Element:</span><span className="zodiac-value">{zData.element}</span></div>
                <div className="zodiac-detail-item"><span className="zodiac-label">Planet:</span><span className="zodiac-value">{zData.planet}</span></div>
                <div className="zodiac-detail-item"><span className="zodiac-label">Lucky Nums:</span><span className="zodiac-value">{zData.lucky_numbers}</span></div>
                <div className="zodiac-detail-item"><span className="zodiac-label">Strengths:</span><span className="zodiac-value">{zData.strengths}</span></div>
                <div className="zodiac-detail-item"><span className="zodiac-label">Weaknesses:</span><span className="zodiac-value">{zData.weaknesses}</span></div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {user.birthdate ? (
                  <Link to="/astro-insights" className="astro-glow-btn">VIEW FULL CHART</Link>
                ) : (
                  <>
                    <button className="astro-glow-btn" disabled>VIEW FULL CHART</button>
                    <p className="text-muted mt-2" style={{ fontSize: '0.85rem' }}><i className="fas fa-info-circle"></i> Set birthdate to unlock</p>
                  </>
                )}
              </div>
            </div>

            {/* COLOR ANALYSIS SECTION */}
            <div className="color-section text-center">
              <div className="section-title mb-3">Color Analysis</div>
              {user.undertone && user.undertone !== 'Not set' ? (
                <div className="color-content">
                  <div className="mb-3">
                    <p className="mb-1"><strong>Zodiac:</strong> {user.zodiac_sign}</p>
                    <p className="mb-1"><strong>Undertone:</strong> {user.undertone}</p>
                  </div>
                  <div className="color-visual mb-3">
                    <img src={`/assets/images/${user.undertone.toLowerCase()}_wheel.png`} alt={`${user.undertone} wheel`} className="color-wheel" />
                  </div>
                  <div className="color-palette mb-3">
                    {(palettes[user.undertone] || []).map((color, i) => (
                      <div key={i} className="color-swatch d-inline-block" style={{ background: color }}></div>
                    ))}
                  </div>
                  <Link to="/undertone-result" className="btn-style">View Full Analysis</Link>
                </div>
              ) : (
                <div className="py-4" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="text-muted mb-3">Complete color analysis to see your personal color palette</p>
                  <Link to="/undertone-test" className="btn-style">Lets Go!</Link>
                </div>
              )}
            </div>

            {/* AESTHETIC SECTION */}
            <div className="aesthetic-section text-center">
              <div className="section-title mb-2">Aesthetics</div>
              {user.aesthetic_result ? (
                <>
                  <div className="enhanced-badge" style={{ background: aesthetics[user.aesthetic_result]?.color || '#8B5FBF', color: 'white' }}>
                    Your Aesthetic: {aesthetics[user.aesthetic_result]?.title || user.aesthetic_result}
                  </div>
                  <img src={aesthetics[user.aesthetic_result]?.side1} alt={user.aesthetic_result} className="enhanced-aesthetic-image" />
                  <Link to="/aesthetic-result" className="btn-style">View Result</Link>
                </>
              ) : (
                <>
                  <p style={{ marginTop: '20px' }}>Want to know your Aesthetic?</p>
                  <Link to="/aesthetic-welcome" className="btn-style">Lets Go!</Link>
                </>
              )}
            </div>

            {/* STYLE SECTION */}
            <div className="outfit-section text-center">
              <div className="section-title mb-2">Your Style</div>
              {user.style_result ? (
                <>
                  <div className="enhanced-badge" style={{ background: styleInfo[user.style_result]?.color, color: styleInfo[user.style_result]?.text_color }}>
                    {styleInfo[user.style_result]?.name}
                  </div>
                  <Link to="/style-result" className="btn-style mt-4">View Full Analysis</Link>
                </>
              ) : (
                <>
                  <p style={{ marginTop: '20px' }}>Want to know your Style?</p>
                  <Link to="/style-welcome" className="btn-style">Lets Go!</Link>
                </>
              )}
            </div>

            {/* MOODBOARD SECTION */}
            <div className="moodboard-section">
              {hasMoodboard ? (
                <div className="moodboard-complete">
                  <div className="moodboard-icon">🎨</div>
                  <div className="moodboard-title">Your Moodboard is Ready!</div>
                  <div className="moodboard-subtitle">Explore your personalized style visualization</div>
                  <Link to="/moodboard-result" className="btn-style" style={{ background: '#fff', color: '#8B5FBF' }}>View Moodboard</Link>
                </div>
              ) : (
                <div className="moodboard-incomplete">
                  <div className="moodboard-incomplete-icon">🎨</div>
                  <div className="moodboard-incomplete-title">Moodboard</div>
                  <div className="moodboard-incomplete-subtitle">Complete your style journey to unlock</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content dark-theme">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ color: '#fff' }}>Edit Profile</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <h6 className="mb-3" style={{ color: '#6b5b95' }}><i className="fas fa-user"></i> Basic Information</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-light">Full Name</label>
                      <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-light">Gender</label>
                      <select className="form-control" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                        <option value="">Select Gender</option>
                        <option value="Masculine">Masculine</option>
                        <option value="Feminine">Feminine</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-light">Date of Birth</label>
                      <input type="date" className="form-control" value={formData.birthdate} onChange={(e) => setFormData({...formData, birthdate: e.target.value})} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#6b5b95', color: '#fff', borderRadius: '30px', padding: '12px 20px' }}>
                  <i className="fas fa-save"></i> Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
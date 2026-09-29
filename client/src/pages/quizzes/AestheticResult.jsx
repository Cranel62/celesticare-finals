import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AESTHETICS = {
  academia: {
    title: "The Scholar",
    desc: "You're drawn to timeless sophistication — think books, tweed, and candlelit study sessions. You find beauty in intellect and classic detail.",
    history: "Rooted in literary charm and old-world academia, this aesthetic draws from classic literature, university libraries, and British collegiate style.",
    mood: "Intellectual • Vintage • Poised",
    bg: "/assets/images/quizzes/acad_bg3.jpg",
    side1: "/assets/images/quizzes/acad1.jpg",
    side2: "/assets/images/quizzes/acad3.jpg",
    color: "rgb(186, 170, 158)",
    music: "/assets/music/acad.mp3"
  },
  boho: {
    title: "The Bohemian Dreamer",
    desc: "You embody freedom, creativity, and a love for earthy tones and textures. Every outfit tells a story — unbothered, soulful, and effortlessly chic.",
    history: "Emerging from 1960s counterculture, Bohemian style fuses artistic expression with natural fabrics and global influences.",
    mood: "Free-Spirited • Earthy • Artistic",
    bg: "/assets/images/quizzes/boho_bg2.jpg",
    side1: "/assets/images/quizzes/boho2.jpg",
    side2: "/assets/images/quizzes/boho1.jpg",
    color: "#e38153",
    music: "/assets/music/boho.mp3"
  },
  coquette: {
    title: "The Coquette Muse",
    desc: "Romantic and soft, your style leans into vintage elegance — ribbons, lace, and an air of flirtatious nostalgia.",
    history: "Blending Rococo-era charm with 90s Lolita revival, the Coquette aesthetic celebrates femininity and delicate romanticism.",
    mood: "Romantic • Vintage • Playful",
    bg: "/assets/images/quizzes/coquette_bg.jpg",
    side1: "/assets/images/quizzes/coquette2.jpg",
    side2: "/assets/images/quizzes/coquette12.jpg",
    color: "#f5c4d4",
    music: "/assets/music/coquette.mp3"
  },
  luxurious: {
    title: "The Luxe Visionary",
    desc: "Glitter, confidence, and high drama — your aura screams sophistication and luxury. You turn moments into red-carpet statements.",
    history: "Rooted in Old Hollywood and modern couture, Glam embraces opulence, allure, and timeless beauty.",
    mood: "Elegant • Dazzling • Confident",
    bg: "/assets/images/quizzes/glam_bg1.jpg",
    side1: "/assets/images/quizzes/glam2.jpg",
    side2: "/assets/images/quizzes/glam1.jpg",
    color: "rgb(250, 202, 114)",
    music: "/assets/music/glam.mp3"
  },
  grunge: {
    title: "The Rebel Soul",
    desc: "You thrive in expressive chaos — distressed textures, dark tones, and a bold disregard for convention define your edge.",
    history: "Born from 90s alternative rock culture, Grunge fashion embodies rebellion, comfort, and raw individuality.",
    mood: "Edgy • Unfiltered • Rebellious",
    bg: "/assets/images/quizzes/grunge_bg2.jpg",
    side1: "/assets/images/quizzes/grunge2.jpg",
    side2: "/assets/images/quizzes/grunge3.jpg",
    color: "rgb(180, 176, 198)",
    music: "/assets/music/grunge.mp3"
  },
  punk: {
    title: "The Anarchic Icon",
    desc: "You wear rebellion like armor — unapologetic, loud, and endlessly cool. Spikes, leather, and confidence are your essentials.",
    history: "Emerging from 1970s UK subcultures, punk aesthetic rejected mainstream norms through fashion, music, and activism.",
    mood: "Defiant • Raw • Bold",
    bg: "/assets/images/quizzes/punk_bg1.jpg",
    side1: "/assets/images/quizzes/punk1.jpg",
    side2: "/assets/images/quizzes/punk3.jpg",
    color: "rgb(255, 0, 191)",
    music: "/assets/music/punk.mp3"
  },
  y2k: {
    title: "The Futuristic Popstar",
    desc: "You radiate playful confidence with metallics, baby tees, and digital-era nostalgia. The early 2000s live in your sparkle.",
    history: "A revival of late 90s and early 2000s cyber fashion — glossy textures, technology-inspired motifs, and glittery confidence.",
    mood: "Playful • Futuristic • Glam",
    bg: "/assets/images/quizzes/y2k_bg2.jpg",
    side1: "/assets/images/quizzes/y2k1.jpg",
    side2: "/assets/images/quizzes/y2k3.jpg",
    color: "#d46be3",
    music: "/assets/music/y2k.mp3"
  }
};

export default function AestheticResult() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Determine aesthetic from URL or local storage
    const user = JSON.parse(localStorage.getItem('celesticare_user') || '{}');
    const finalAesthetic = resultId || user.aesthetic_result;

    if (!finalAesthetic || !AESTHETICS[finalAesthetic]) {
      navigate('/aesthetic-welcome');
      return;
    }
    setData(AESTHETICS[finalAesthetic]);
  }, [resultId, navigate]);

  if (!data) return null;

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      background: `url(${data.bg}) center/cover no-repeat fixed`,
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0,0,0,0.8))',
        minHeight: 'calc(100vh - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '60px 20px', position: 'relative'
      }}>
        
        {/* Magazine Side Images - Hidden on smaller screens for cleaner UI */}
        <img src={data.side1} alt="Style 1" style={{ position: 'absolute', left: '60px', top: '50%', transform: 'translateY(-50%)', width: '220px', height: '320px', borderRadius: '18px', objectFit: 'cover', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', opacity: 0.9 }} className="d-none d-xl-block" />
        <img src={data.side2} alt="Style 2" style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', width: '220px', height: '320px', borderRadius: '18px', objectFit: 'cover', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', opacity: 0.9 }} className="d-none d-xl-block" />

        <div style={{
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
          borderRadius: '30px', padding: '60px', maxWidth: '850px', width: '100%',
          color: '#fdfdfd', boxShadow: '0 10px 50px rgba(0,0,0,0.6)', zIndex: 2,
          border: '1.5px solid rgba(255,255,255,0.25)'
        }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 700, color: data.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
            {data.title}
          </h1>

          <div style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', marginTop: '30px' }}>About</div>
          <p style={{ fontSize: '1.05rem', color: '#f0f0f0', lineHeight: 1.8 }}>{data.desc}</p>

          <div style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', marginTop: '30px' }}>History</div>
          <p style={{ fontSize: '1.05rem', color: '#f0f0f0', lineHeight: 1.8 }}>{data.history}</p>

          <div style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', marginTop: '30px' }}>Mood</div>
          <p style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '1.1rem', color: data.color }}>{data.mood}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '40px', flexWrap: 'wrap' }}>
            <Link to="/dashboard" style={{ background: data.color, color: '#fff', padding: '14px 45px', borderRadius: '35px', fontWeight: 600, textDecoration: 'none' }}>Back to Dashboard</Link>
            <Link to="/aesthetic-quiz" style={{ background: 'transparent', border: `2px solid ${data.color}`, color: '#fff', padding: '12px 45px', borderRadius: '35px', fontWeight: 600, textDecoration: 'none' }}>Retake Quiz</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
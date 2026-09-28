import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetToKnow.css';

export default function GetToKnow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', birthdate: '', gender: '' });

  const calculateZodiac = (dateStr) => {
    const d = new Date(dateStr);
    const m = d.getMonth() + 1, day = d.getDate();
    if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries';
    if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus';
    if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini';
    if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer';
    if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo';
    if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo';
    if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra';
    if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio';
    if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Sagittarius';
    if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Capricorn';
    if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sign = calculateZodiac(formData.birthdate);
    localStorage.setItem('celesticare_onboarding', JSON.stringify({ ...formData, zodiac_sign: sign }));
    navigate('/zodiac-result');
  };

  return (
    <div className="gtk-body">
      <div className="setup-box">
        <div className="brand-title">CELESTICARE</div>
        <h2>Time to get to know you</h2>
        <p>Provide the following details below</p>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="date" className="form-control" required onChange={e => setFormData({...formData, birthdate: e.target.value})} />
          <select className="form-control" required defaultValue="" onChange={e => setFormData({...formData, gender: e.target.value})}>
            <option value="" disabled>Masculine, Feminine</option>
            <option value="Masculine">Masculine</option>
            <option value="Feminine">Feminine</option>
          </select>
          <button type="submit" className="btn-continue">Continue</button>
        </form>
      </div>
    </div>
  );
}
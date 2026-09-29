// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Core Components & Pages
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import GetToKnow from './pages/GetToKnow';
import ZodiacResult from './pages/ZodiacResult';
import UndertoneTest from './pages/UndertoneTest';
import UndertoneResult from './pages/UndertoneResult';
import AstroView from './pages/AstroView';

// Auth Pages
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Tarot Pages
import TarotHome from './pages/tarot/TarotHome';
import SingleCardPicker from './pages/tarot/SingleCardPicker';
import FourCardPicker from './pages/tarot/FourCardPicker';
import SingleCardResult from './pages/tarot/SingleCardResult';
import FourCardResult from './pages/tarot/FourCardResult';

// Aesthetic Quiz Pages
import AestheticWelcome from './pages/quizzes/AestheticWelcome';
import AestheticQuiz from './pages/quizzes/AestheticQuiz';
import AestheticResult from './pages/quizzes/AestheticResult';

// Global Styles
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('celesticare_token');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <div style={{ paddingTop: '100px' }}> 
        <Routes>
          {/* Onboarding & Core */}
          <Route path="/" element={<Landing />} />
          <Route path="/get-to-know" element={<GetToKnow />} />
          <Route path="/zodiac-result" element={<ZodiacResult />} />
          <Route path="/undertone-test" element={<UndertoneTest />} />
          <Route path="/undertone-result" element={<UndertoneResult />} />
          <Route path="/astro-view" element={<AstroView />} />
          
          {/* Tarot Module */}
          <Route path="/tarot" element={<TarotHome />} />
          <Route path="/tarot/single" element={<SingleCardPicker />} />
          <Route path="/tarot/four" element={<FourCardPicker />} />
          <Route path="/tarot/single-result/:id" element={<SingleCardResult />} />
          <Route path="/tarot/four-result" element={<FourCardResult />} />

          {/* Aesthetic Quiz Module */}
          <Route path="/aesthetic-welcome" element={<ProtectedRoute><AestheticWelcome /></ProtectedRoute>} />
          <Route path="/aesthetic-quiz" element={<ProtectedRoute><AestheticQuiz /></ProtectedRoute>} />
          <Route path="/aesthetic-result/:resultId?" element={<ProtectedRoute><AestheticResult /></ProtectedRoute>} />

          {/* Auth & Dashboard */}
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
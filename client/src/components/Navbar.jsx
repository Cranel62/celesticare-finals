// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('celesticare_token');

  const handleLogout = () => {
    localStorage.removeItem('celesticare_token');
    localStorage.removeItem('celesticare_user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/assets/images/logo1.png" alt="C" className="custom-c-image" />
          <span className="brand-text">
            <span className="rest-of-text">ELESTICARE</span>
          </span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <img src="/assets/images/dashboard.png" alt="Dashboard" className="nav-icon" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/astro-view">
                    <img src="/assets/images/zodiacs.png" alt="Zodiacs" className="nav-icon" />
                    <span>AstroView</span>
                  </Link>
                </li>
                <li className="nav-item">
                  {/* Updated Link: Mystic Arcana now points to /tarot */}
                  <Link className="nav-link" to="/tarot">
                    <div className="mystic-icon">
                      <div className="spirit-ball"></div>
                      <div className="tarot-card card-top"></div>
                      <div className="tarot-card card-right"></div>
                      <div className="tarot-card card-bottom"></div>
                      <div className="tarot-card card-left"></div>
                    </div>
                    <span>Mystic Arcana</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    <i className="fas fa-info-circle nav-fa-icon"></i>
                    <span>About Us</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-danger" onClick={handleLogout} style={{ border: 'none', background: 'transparent' }}>
                    <i className="fas fa-sign-out-alt nav-fa-icon"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home nav-fa-icon"></i>
                    <span>Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    <i className="fas fa-info-circle nav-fa-icon"></i>
                    <span>About</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-user-plus nav-fa-icon"></i>
                    <span>Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
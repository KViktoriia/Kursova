import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Atom, Menu, X } from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
            <Atom className="me-2 text-info" size={32} />
            <div>
              <span className="fw-bold text-white">НАУКОВИЙ ЦЕНТР</span>
              <div style={{ fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.8 }} className="text-info">
                ЗАКЛАДУ ВИЩОЇ ОСВІТИ
              </div>
            </div>
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="text-white" size={28} /> : <Menu className="text-white" size={28} />}
          </button>

          {/* Navigation Links */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show d-block' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-3 mt-lg-0 gap-2">
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/" 
                  end 
                  onClick={closeMenu}
                >
                  Головна
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/about" 
                  onClick={closeMenu}
                >
                  Про центр
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/gallery" 
                  onClick={closeMenu}
                >
                  Галерея
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/news" 
                  onClick={closeMenu}
                >
                  Новини
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/contacts" 
                  onClick={closeMenu}
                >
                  Контакти
                </NavLink>
              </li>
              <li className="nav-item ms-lg-2">
                <NavLink 
                  className={({ isActive }) => `btn btn-outline-info px-4 py-2 text-white border-info rounded-pill ${isActive ? 'bg-info text-dark font-weight-bold' : ''}`} 
                  to="/admin" 
                  onClick={closeMenu}
                >
                  Кабінет
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

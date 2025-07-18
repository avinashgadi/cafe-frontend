import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <div className="flex-between" style={{ minHeight: '60px' }}>
        <div className="flex" style={{ gap: '0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '1px' }}>
            <span role="img" aria-label="cafe">☕</span> Anvi's Cafe
          </span>
        </div>
        <nav className="flex" style={{ gap: '1rem' }}>
          <div className={`flex nav-links ${menuOpen ? 'open' : ''}`} style={{ gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/cart">MyCart</Link>
            <Link to="/order">MyOrder</Link>
            {user?.role === "admin" && <Link to="/admin">Admin</Link>}
            {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
          </div>
          <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '2rem', marginLeft: '1rem' }}>
            <span role="img" aria-label="menu">🍔</span>
          </button>
        </nav>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            right: 1rem;
            top: 60px;
            background: var(--surface);
            box-shadow: var(--shadow);
            border-radius: var(--radius);
            padding: 1rem;
            z-index: 100;
          }
          .nav-links.open {
            display: flex;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
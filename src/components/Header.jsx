import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

// Import the logo
import cafeLogo from "../assets/cafe-logo.png";

export default function Header() {
  const { user, cart } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // Calculate total items in cart
  const cartCount = cart && cart.length > 0 ? cart.reduce((sum, item) => sum + (item.qty || 0), 0) : 0;

  const handleBrandClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <header>
      {/* Google Fonts for unique brand font */}
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <div className="flex-between" style={{ minHeight: '60px' }}>
        <div className="flex brand-area" style={{ gap: '0.7rem', alignItems: 'center', cursor: 'pointer' }} onClick={handleBrandClick} tabIndex={0} role="button" aria-label="Go to Home">
          <span className="logo-hexagon">
            <img src={cafeLogo} alt="Anvi's Cafe Logo" style={{ width: 54, height: 54, objectFit: 'cover' }} />
          </span>
          <span className="brand-name" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 700, fontSize: '2rem', letterSpacing: '1px', color: 'var(--primary-dark)' }}>
            Anvi's Cafe
          </span>
        </div>
        <nav className="flex" style={{ gap: '1rem', alignItems: 'center' }}>
          <form className="nav-search-form" onSubmit={handleSearch} autoComplete="off">
            <input
              className="nav-search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
            <button className="nav-search-btn" type="submit" aria-label="Search">🔍</button>
          </form>
          <div className={`flex nav-links ${menuOpen ? 'open' : ''}`} style={{ gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
              MyCart
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
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
        .brand-name {
          font-family: 'Pacifico', cursive !important;
          font-size: 2rem;
          color: var(--primary-dark);
          letter-spacing: 0.04em;
          text-shadow: 0 2px 8px rgba(60,40,20,0.08);
        }
        .brand-area img {
          display: block;
        }
        .logo-hexagon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          box-shadow: 0 2px 8px rgba(60,40,20,0.08);
          /* Modern squircle/hexagon shape */
          clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%);
          border-radius: 18px;
        }
        .brand-area:focus {
          outline: 2px solid var(--primary-dark);
        }
        .nav-search-form {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(60,40,20,0.06);
          padding: 0.1rem 0.5rem;
          margin-right: 1.2rem;
        }
        .nav-search-input {
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 0.5rem 0.7rem;
          border-radius: 8px;
          background: transparent;
          color: var(--primary-dark);
          min-width: 120px;
        }
        .nav-search-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: var(--primary-dark);
          cursor: pointer;
          margin-left: 0.2rem;
        }
        .cart-badge {
          position: absolute;
          top: -10px;
          right: -18px;
          background: var(--primary-dark);
          color: #fff;
          border-radius: 50%;
          min-width: 22px;
          height: 22px;
          font-size: 0.98rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(60,40,20,0.13);
          z-index: 2;
          border: 2px solid #fff;
        }
        @media (max-width: 900px) {
          .nav-search-form {
            margin-right: 0.2rem;
          }
        }
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
          .brand-name {
            font-size: 1.3rem;
          }
          .brand-area img, .logo-hexagon {
            width: 38px;
            height: 38px;
          }
          .cart-badge {
            min-width: 18px;
            height: 18px;
            font-size: 0.85rem;
            top: -8px;
            right: -12px;
          }
          .nav-search-input {
            min-width: 70px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </header>
  );
}
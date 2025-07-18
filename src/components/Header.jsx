import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

// Import the logo
import cafeLogo from "../assets/cafe-logo.png";

export default function Header() {
  const { user, cart } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Calculate total items in cart
  const cartCount = cart && cart.length > 0 ? cart.reduce((sum, item) => sum + (item.qty || 0), 0) : 0;

  // Keep search bar in sync with URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || "");
  }, [location.search]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleNameClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    } else {
      navigate("/");
      setMenuOpen(false);
    }
  };

  return (
    <header className="main-navbar compact-navbar">
      {/* Google Fonts for unique brand font */}
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <div className="navbar-inner compact-navbar-inner">
        <div className="flex compact-brand-row" style={{ alignItems: 'center', gap: '1.1rem' }}>
          <span
            className="logo-circle logo-hoverable"
            onClick={handleLogoClick}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            style={{ cursor: 'pointer' }}
          >
            <img src={cafeLogo} alt="Anvi's Cafe Logo" className="logo-img-circle logo-img-fill" />
          </span>
          <span
            className="brand-name compact-brand-name name-hoverable"
            onClick={handleNameClick}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            style={{ cursor: 'pointer', marginLeft: '0.3rem' }}
          >
            Anvi's Cafe
          </span>
        </div>
        <nav className="flex compact-nav" style={{ gap: '1.2rem' }}>
          <form className="nav-search-form compact-search-form" onSubmit={handleSearch} autoComplete="off">
            <input
              className="nav-search-input compact-search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
            <button className="nav-search-btn compact-search-btn" type="submit" aria-label="Search">🔍</button>
          </form>
          <div className={`flex nav-links compact-nav-links ${menuOpen ? 'open' : ''}`} style={{ gap: '1.1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
              MyCart
              {cartCount > 0 && (
                <span className="cart-badge compact-cart-badge">{cartCount}</span>
              )}
            </Link>
            <Link to="/order">MyOrder</Link>
            {user?.role === "admin" && <Link to="/admin">Admin</Link>}
            {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
          </div>
          <button className="hamburger compact-hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span role="img" aria-label="menu">🍔</span>
          </button>
        </nav>
      </div>
      <style>{`
        .main-navbar.compact-navbar {
          background: #fff8f0;
          box-shadow: 0 2px 10px rgba(60,40,20,0.07);
          border-bottom: 1.5px solid #f3e6d8;
          border-radius: 0 0 16px 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          min-height: unset;
        }
        .navbar-inner.compact-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.2rem;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: space-between;
          min-height: 58px;
        }
        .compact-brand-row {
          flex-direction: row;
          align-items: center;
        }
        .logo-circle {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          box-shadow: 0 2px 8px rgba(60,40,20,0.10);
          border: 2px solid #a1887f;
          border-radius: 50%;
          overflow: hidden;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .logo-hoverable:hover, .logo-hoverable:focus {
          box-shadow: 0 4px 18px rgba(60,40,20,0.18);
          transform: scale(1.10);
        }
        .logo-img-circle {
          width: 48px;
          height: 48px;
          object-fit: cover;
          display: block;
        }
        .logo-img-fill {
          object-fit: cover !important;
        }
        .brand-name.compact-brand-name {
          font-family: 'Pacifico', cursive !important;
          font-size: 1.25rem;
          color: var(--primary-dark);
          letter-spacing: 0.04em;
          text-shadow: 0 1px 4px rgba(60,40,20,0.06);
          transition: color 0.18s;
        }
        .name-hoverable:hover, .name-hoverable:focus {
          color: #a1887f;
        }
        .compact-nav {
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }
        .nav-search-form.compact-search-form {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(60,40,20,0.04);
          padding: 0.05rem 0.3rem;
          margin-right: 0.7rem;
          height: 36px;
        }
        .nav-search-input.compact-search-input {
          border: none;
          outline: none;
          font-size: 0.98rem;
          padding: 0.3rem 0.5rem;
          border-radius: 8px;
          background: transparent;
          color: var(--primary-dark);
          min-width: 90px;
        }
        .nav-search-btn.compact-search-btn {
          background: none;
          border: none;
          font-size: 1.1rem;
          color: var(--primary-dark);
          cursor: pointer;
          margin-left: 0.1rem;
        }
        .nav-links.compact-nav-links {
          align-items: center;
        }
        .cart-badge.compact-cart-badge {
          position: absolute;
          top: -8px;
          right: -14px;
          background: var(--primary-dark);
          color: #fff;
          border-radius: 50%;
          min-width: 16px;
          height: 16px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 4px rgba(60,40,20,0.10);
          z-index: 2;
          border: 2px solid #fff;
        }
        .hamburger.compact-hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          margin-left: 0.7rem;
        }
        @media (max-width: 900px) {
          .navbar-inner.compact-navbar-inner {
            padding: 0 0.3rem;
          }
          .nav-search-form.compact-search-form {
            margin-right: 0.2rem;
          }
        }
        @media (max-width: 700px) {
          .nav-links.compact-nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            right: 1rem;
            top: 54px;
            background: var(--surface);
            box-shadow: var(--shadow);
            border-radius: var(--radius);
            padding: 1rem;
            z-index: 100;
          }
          .nav-links.compact-nav-links.open {
            display: flex;
          }
          .hamburger.compact-hamburger {
            display: block !important;
          }
          .brand-name.compact-brand-name {
            font-size: 1rem;
          }
          .logo-circle {
            width: 32px;
            height: 32px;
          }
          .logo-img-circle {
            width: 32px;
            height: 32px;
          }
          .cart-badge.compact-cart-badge {
            min-width: 13px;
            height: 13px;
            font-size: 0.7rem;
            top: -6px;
            right: -8px;
          }
          .nav-search-input.compact-search-input {
            min-width: 50px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </header>
  );
}
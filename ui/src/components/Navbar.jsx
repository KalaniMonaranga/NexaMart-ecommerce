import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const navLinks = [
  { name: "All Categories", path: "/categories" },
  { name: "Offers", path: "/offers" },
  { name: "For You", path: "/for-you" },
  { name: "New Arrivals", path: "/new-arrivals" },
];

const iconLinks = [
  { to: "/wishlist", icon: <FaHeart />, badge: 2, badgeColor: "#3B82F6", label: "Wishlist" },
  { to: "/cart", icon: <FaShoppingCart />, badge: 3, badgeColor: "#60A5FA", label: "Cart" },
  { to: "/profile", icon: <FaUserCircle />, label: "Profile" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --navy: #1E3A8A;
          --navy-mid: #1E3A8A;
          --blue: #3B82F6;
          --blue-light: #60A5FA;
          --accent: #60A5FA;
          --gray: #E5E7EB;
          --white: #ffffff;
          --offwhite: #f8faff;
          --muted: #9ca3af;
          --border: rgba(255,255,255,0.12);
          --border-gray: rgba(229,231,235,0.2);
          --shadow: 0 4px 32px rgba(30,58,138,0.32);
          --radius: 14px;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nx-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: var(--font-body);
          transition: box-shadow 0.3s ease;
        }

        .nx-nav.scrolled {
          box-shadow: var(--shadow);
        }

        /* ── TOP BAR ── */
        .nx-topbar {
          background: var(--navy);
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 16px;
          border-bottom: 1px solid var(--border-gray);
        }

        /* Logo */
        .nx-logo {
          font-family: var(--font-head);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--white);
          text-decoration: none;
          letter-spacing: -0.5px;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .nx-logo span {
          color: var(--blue-light);
        }
        .nx-logo:hover { opacity: 0.85; }

        /* Search */
        .nx-search {
          flex: 1;
          max-width: 540px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .nx-search input {
          width: 100%;
          height: 40px;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.13);
          border-radius: 10px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 0 44px 0 16px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .nx-search input::placeholder { color: var(--muted); }
        .nx-search input:focus {
          border-color: var(--blue-light);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(96,165,250,0.25);
        }

        .nx-search-btn {
          position: absolute;
          right: 6px;
          width: 30px; height: 30px;
          background: var(--blue);
          border: none;
          border-radius: 7px;
          color: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          transition: background 0.2s, transform 0.15s;
        }
        .nx-search-btn:hover { background: var(--blue-light); transform: scale(1.05); }

        /* Right cluster */
        .nx-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Icon buttons */
        .nx-icon-btn {
          position: relative;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.8);
          font-size: 1.15rem;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
        }
        .nx-icon-btn:hover {
          color: white;
          background: rgba(255,255,255,0.1);
        }

        .nx-badge {
          position: absolute;
          top: 4px; right: 4px;
          width: 17px; height: 17px;
          border-radius: 50%;
          font-size: 0.6rem;
          font-weight: 700;
          color: white;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid var(--navy);
        }

        /* Divider */
        .nx-divider {
          width: 1px;
          height: 28px;
          background: var(--border);
          margin: 0 4px;
        }

        /* Auth buttons */
        .nx-btn-signin {
          height: 36px;
          padding: 0 16px;
          background: var(--blue);
          color: white;
          border: none;
          border-radius: 9px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: none;
          display: flex; align-items: center;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nx-btn-signin:hover { background: var(--blue-light); transform: translateY(-1px); }

        .nx-btn-signup {
          height: 36px;
          padding: 0 16px;
          background: transparent;
          color: var(--gray);
          border: 1.5px solid rgba(96,165,250,0.5);
          border-radius: 9px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: none;
          display: flex; align-items: center;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nx-btn-signup:hover {
          border-color: var(--blue-light);
          background: rgba(96,165,250,0.12);
          color: white;
          transform: translateY(-1px);
        }

        .nx-hamburger {
          display: none;
          width: 40px; height: 40px;
          align-items: center; justify-content: center;
          background: rgba(96,165,250,0.12);
          border: 1px solid rgba(96,165,250,0.3);
          border-radius: 10px;
          color: var(--gray);
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .nx-hamburger:hover { background: rgba(96,165,250,0.22); }

        /* ── BOTTOM LINKS BAR ── */
        .nx-linkbar {
          background: #162d6e;
          border-bottom: 1px solid var(--border-gray);
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          gap: 0;
        }

        .nx-link {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray);
          text-decoration: none;
          padding: 0 20px;
          height: 42px;
          display: flex; align-items: center;
          position: relative;
          transition: color 0.2s;
        }
        .nx-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 20px; right: 20px;
          height: 2px;
          background: var(--blue-light);
          border-radius: 2px 2px 0 0;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }
        .nx-link:hover { color: white; }
        .nx-link:hover::after, .nx-link.active::after { transform: scaleX(1); }
        .nx-link.active { color: white; }

        /* ── MOBILE DRAWER ── */
        .nx-drawer {
          background: #1E3A8A;
          border-top: 1px solid var(--border-gray);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nx-drawer.open {
          max-height: 480px;
        }

        .nx-drawer-inner {
          padding: 16px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Mobile search */
        .nx-mob-search {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .nx-mob-search input {
          flex: 1;
          height: 40px;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.13);
          border-radius: 10px;
          color: white;
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 0 14px;
          outline: none;
        }
        .nx-mob-search input::placeholder { color: var(--muted); }
        .nx-mob-search input:focus { border-color: var(--blue-light); }
        .nx-mob-search button {
          width: 40px; height: 40px;
          background: var(--blue);
          border: none; border-radius: 10px;
          color: white; font-size: 0.85rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }

        .nx-drawer-link {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--gray);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.2s, color 0.2s;
        }
        .nx-drawer-link:hover, .nx-drawer-link.active {
          background: rgba(96,165,250,0.15);
          color: white;
        }

        .nx-drawer-sep {
          height: 1px;
          background: rgba(96,165,250,0.2);
          margin: 10px 0;
        }

        /* Mobile auth row */
        .nx-mob-auth {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }
        .nx-mob-auth a { flex: 1; }
        .nx-mob-auth .nx-btn-signin,
        .nx-mob-auth .nx-btn-signup {
          width: 100%;
          justify-content: center;
          height: 40px;
        }

        /* Mobile icon row */
        .nx-mob-icons {
          display: flex;
          gap: 10px;
          margin-bottom: 4px;
        }
        .nx-mob-icon-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 10px;
          transition: background 0.2s, color 0.2s;
          position: relative;
        }
        .nx-mob-icon-item:hover { background: rgba(96,165,250,0.15); color: white; }
        .nx-mob-badge {
          margin-left: auto;
          width: 20px; height: 20px;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          color: white;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nx-search { max-width: 320px; }
        }

        @media (max-width: 768px) {
          .nx-topbar { padding: 0 16px; height: 58px; }
          .nx-search { display: none; }
          .nx-linkbar { display: none; }
          .nx-btn-signin, .nx-btn-signup { display: none; }
          .nx-hamburger { display: flex; }
          /* Show icons on mobile (condensed) */
          .nx-icon-btn { display: none; }
          .nx-divider { display: none; }
        }

        @media (min-width: 769px) {
          .nx-drawer { display: none; }
          .nx-hamburger { display: none; }
        }

        /* Spacer for fixed nav */
        .nx-spacer-desktop { height: 106px; }
        .nx-spacer-mobile  { height: 58px; }

        @media (max-width: 768px) {
          .nx-spacer-desktop { display: none; }
        }
        @media (min-width: 769px) {
          .nx-spacer-mobile { display: none; }
        }
      `}</style>

      <nav className={`nx-nav${scrolled ? " scrolled" : ""}`} ref={menuRef}>

        <div className="nx-topbar">
          <Link to="/" className="nx-logo">Nexa<span>Mart</span></Link>

          <div className="nx-search">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="nx-search-btn" aria-label="Search">
              <FaSearch />
            </button>
          </div>

          <div className="nx-right">
            {iconLinks.map((item, i) => (
              <Link key={i} to={item.to} className="nx-icon-btn" aria-label={item.label}>
                {item.icon}
                {item.badge && (
                  <span className="nx-badge" style={{ background: item.badgeColor }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="nx-divider" />

            <Link to="/login" className="nx-btn-signin">Sign In</Link>
            <Link to="/register" className="nx-btn-signup">Sign Up</Link>

            <button
              className="nx-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="nx-linkbar">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`nx-link${location.pathname === item.path ? " active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className={`nx-drawer${menuOpen ? " open" : ""}`}>
          <div className="nx-drawer-inner">

            <div className="nx-mob-search">
              <input
                type="text"
                placeholder="Search products..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
              <button aria-label="Search"><FaSearch /></button>
            </div>

            {navLinks.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={`nx-drawer-link${location.pathname === item.path ? " active" : ""}`}
              >
                {item.name}
                <FaChevronDown style={{ transform: "rotate(-90deg)", opacity: 0.4, fontSize: "0.75rem" }} />
              </Link>
            ))}

            <div className="nx-drawer-sep" />

            <div className="nx-mob-icons">
              {iconLinks.map((item, i) => (
                <Link key={i} to={item.to} className="nx-mob-icon-item" aria-label={item.label}>
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="nx-mob-badge" style={{ background: item.badgeColor }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="nx-drawer-sep" />

            <div className="nx-mob-auth">
              <Link to="/login" className="nx-btn-signin">Sign In</Link>
              <Link to="/register" className="nx-btn-signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="nx-spacer-desktop" />
      <div className="nx-spacer-mobile" />
    </>
  );
}

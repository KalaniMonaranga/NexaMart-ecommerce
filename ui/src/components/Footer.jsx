import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

const footerLinks = {
  Shop: [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/products" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Offers & Deals", path: "/offers" },
    { label: "Cart", path: "/cart" },
    { label: "Wishlist", path: "/wishlist" },
  ],
  Account: [
    { label: "My Profile", path: "/profile" },
    { label: "Sign In", path: "/login" },
    { label: "Sign Up", path: "/register" },
    { label: "Order History", path: "/orders" },
    { label: "Track Order", path: "/track" },
  ],
  Support: [
    { label: "Help Center", path: "/help" },
    { label: "Returns & Refunds", path: "/returns" },
    { label: "Shipping Info", path: "/shipping" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
  ],
};

const socialLinks = [
  { icon: <FaFacebookF />, href: "#", label: "Facebook", color: "#1877F2" },
  { icon: <FaTwitter />, href: "#", label: "Twitter", color: "#1DA1F2" },
  { icon: <FaInstagram />, href: "#", label: "Instagram", color: "#E1306C" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn", color: "#0A66C2" },
  { icon: <FaYoutube />, href: "#", label: "YouTube", color: "#FF0000" },
];

const contactInfo = [
  { icon: <FiMail />, text: "support@nexamart.com" },
  { icon: <FiPhone />, text: "+1 (800) 123-4567" },
  { icon: <FiMapPin />, text: "123 Commerce St, NY 10001" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --navy:      #1E3A8A;
          --blue:      #3B82F6;
          --blue-lt:   #60A5FA;
          --gray:      #E5E7EB;
          --white:     #FFFFFF;
          --navy-dark: #162d6e;
          --navy-deep: #0f1e45;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        /* ── FOOTER SHELL ── */
        .ft {
          background: var(--navy-deep);
          font-family: var(--font-body);
          position: relative;
          overflow: hidden;
        }

        /* Decorative top gradient bar */
        .ft::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--navy) 0%, var(--blue) 40%, var(--blue-lt) 70%, var(--blue) 100%);
        }

        /* Subtle radial glow in top-left */
        .ft::after {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── NEWSLETTER BAND ── */
        .ft-news {
          background: var(--navy);
          padding: 36px 0;
          border-bottom: 1px solid rgba(96,165,250,0.15);
          position: relative;
          z-index: 1;
        }

        .ft-news-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .ft-news-text h4 {
          font-family: var(--font-head);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--white);
          margin: 0 0 4px;
          letter-spacing: -0.3px;
        }

        .ft-news-text p {
          font-size: 0.875rem;
          color: var(--gray);
          margin: 0;
          opacity: 0.8;
        }

        .ft-news-form {
          display: flex;
          gap: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid rgba(96,165,250,0.3);
          min-width: 300px;
          transition: border-color 0.2s;
        }
        .ft-news-form:focus-within {
          border-color: var(--blue-lt);
          box-shadow: 0 0 0 3px rgba(96,165,250,0.15);
        }

        .ft-news-form input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: none;
          outline: none;
          padding: 0 16px;
          height: 44px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 0.875rem;
        }
        .ft-news-form input::placeholder { color: rgba(229,231,235,0.45); }

        .ft-news-form button {
          background: var(--blue);
          border: none;
          padding: 0 20px;
          height: 44px;
          color: var(--white);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .ft-news-form button:hover { background: var(--blue-lt); }
        .ft-news-form button svg { transition: transform 0.2s; }
        .ft-news-form button:hover svg { transform: translateX(3px); }

        /* ── MAIN BODY ── */
        .ft-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 24px 40px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        /* Brand col */
        .ft-brand-logo {
          font-family: var(--font-head);
          font-size: 1.75rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.5px;
          color: var(--white);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .ft-brand-logo .logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--blue), var(--blue-lt));
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          color: white;
        }
        .ft-brand-logo span { color: var(--blue-lt); }

        .ft-brand-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: rgba(229,231,235,0.7);
          margin-bottom: 24px;
        }

        /* Contact list */
        .ft-contact-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-contact-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.83rem;
          color: rgba(229,231,235,0.65);
        }
        .ft-contact-list li svg {
          color: var(--blue-lt);
          flex-shrink: 0;
          font-size: 0.95rem;
        }

        /* Link cols */
        .ft-col h5 {
          font-family: var(--font-head);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
          margin: 0 0 18px;
          letter-spacing: 0.3px;
          position: relative;
          padding-bottom: 10px;
        }
        .ft-col h5::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 24px; height: 2px;
          background: var(--blue);
          border-radius: 2px;
        }

        .ft-col ul {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ft-col-link {
          font-size: 0.875rem;
          color: rgba(229,231,235,0.65);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0;
          transition: color 0.2s, gap 0.2s, padding-left 0.2s;
        }
        .ft-col-link .ft-link-arrow {
          opacity: 0;
          font-size: 0.75rem;
          color: var(--blue-lt);
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .ft-col-link:hover {
          color: var(--white);
          padding-left: 6px;
        }
        .ft-col-link:hover .ft-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── BOTTOM SOCIAL BAR ── */
        .ft-bottom {
          border-top: 1px solid rgba(96,165,250,0.15);
          position: relative;
          z-index: 1;
        }

        .ft-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* Social icons */
        .ft-social-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ft-social-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(229,231,235,0.45);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-right: 4px;
        }

        .ft-social-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--white);
          text-decoration: none;
          font-size: 0.95rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(96,165,250,0.2);
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.2s,
                      border-color 0.2s,
                      box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .ft-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue), var(--blue-lt));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .ft-social-btn svg { position: relative; z-index: 1; }
        .ft-social-btn:hover {
          transform: translateY(-4px) scale(1.08);
          border-color: var(--blue-lt);
          box-shadow: 0 8px 20px rgba(59,130,246,0.35);
        }
        .ft-social-btn:hover::before { opacity: 1; }

        /* Copyright */
        .ft-copy {
          font-size: 0.8rem;
          color: rgba(229,231,235,0.4);
          text-align: center;
        }
        .ft-copy a {
          color: var(--blue-lt);
          text-decoration: none;
        }
        .ft-copy a:hover { color: var(--white); }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .ft-body {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .ft-body {
            grid-template-columns: 1fr;
            padding: 36px 20px 28px;
            gap: 28px;
          }

          .ft-news-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .ft-news-form {
            width: 100%;
            min-width: unset;
          }

          .ft-social-row {
            flex-wrap: wrap;
            justify-content: center;
          }

          .ft-social-label { width: 100%; text-align: center; }
        }

        @media (max-width: 960px) and (min-width: 601px) {
          .ft-brand-col {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      <footer className="ft">

        <div className="ft-news">
          <div className="ft-news-inner">
            <div className="ft-news-text">
              <h4>Stay in the loop 📬</h4>
              <p>Get exclusive deals, new arrivals & offers straight to your inbox.</p>
            </div>
            <div className="ft-news-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="button">
                Subscribe <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="ft-body">

          <div className="ft-brand-col">
            <Link to="/" className="ft-brand-logo">
              <span className="logo-icon"><FiShoppingBag /></span>
              Nexa<span>Mart</span>
            </Link>
            <p className="ft-brand-desc">
              NexaMart is your one-stop online destination for quality products at
              unbeatable prices. We're committed to fast delivery, easy returns,
              and a seamless shopping experience every time.
            </p>
            <ul className="ft-contact-list">
              {contactInfo.map((item, i) => (
                <li key={i}>{item.icon}{item.text}</li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div className="ft-col" key={heading}>
              <h5>{heading}</h5>
              <ul>
                {links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className="ft-col-link">
                      <FiArrowRight className="ft-link-arrow" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-bottom">
          <div className="ft-bottom-inner">

            <div className="ft-social-row">
              <span className="ft-social-label">Follow us</span>
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="ft-social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="ft-copy">
              © 2026 <a href="/">NexaMart</a>. All rights reserved. &nbsp;·&nbsp;
              <Link to="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link>
              &nbsp;·&nbsp;
              <Link to="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
            </p>
          </div>
        </div>

      </footer>
    </>
  );
}

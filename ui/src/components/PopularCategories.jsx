import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import {
  FaTshirt,
  FaLaptop,
  FaSpa,
  FaCouch,
} from "react-icons/fa";

const categories = [
  {
    name: "Fashion",
    path: "/categories/fashion",
    icon: <FaTshirt />,
    count: "560+ Products",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60",
    gradient: "linear-gradient(145deg, #1E3A8A 0%, #3B82F6 100%)",
  },
  {
    name: "Electronics",
    path: "/categories/electronics",
    icon: <FaLaptop />,
    count: "190+ Products",
    tag: "Hot",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60",
    gradient: "linear-gradient(145deg, #162d6e 0%, #60A5FA 100%)",
  },
  {
    name: "Beauty",
    path: "/categories/beauty",
    icon: <FaSpa />,
    count: "320+ Products",
    tag: "New",
    img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format&fit=crop&q=60",
    gradient: "linear-gradient(145deg, #1E3A8A 0%, #3B82F6 100%)",
  },
  {
    name: "Home",
    path: "/categories/home",
    icon: <FaCouch />,
    count: "420+ Products",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1556185781-a47769abb7ee?w=800&auto=format&fit=crop&q=60",
    gradient: "linear-gradient(145deg, #162d6e 0%, #60A5FA 100%)",
  },
];

export default function PopularCategories() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .pc-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #F0F4FF;
          padding: 60px 0 64px;
        }

        /* ── header ── */
        .pc-hd {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto 36px;
          padding: 0 32px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .pc-hd-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .pc-accent-bar {
          width: 5px;
          height: 44px;
          background: linear-gradient(to bottom, #3B82F6, #60A5FA);
          border-radius: 4px;
          flex-shrink: 0;
        }
        .pc-hd-text {}
        .pc-label {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #3B82F6;
          margin-bottom: 4px;
        }
        .pc-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;
          color: #1E3A8A;
          letter-spacing: -0.4px;
          line-height: 1.1;
        }
        .pc-browse {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3B82F6;
          text-decoration: none;
          border-bottom: 1.5px solid transparent;
          padding-bottom: 1px;
          white-space: nowrap;
          transition: gap 0.2s, color 0.2s, border-color 0.2s;
        }
        .pc-browse:hover { gap: 10px; color: #1E3A8A; border-color: #1E3A8A; }

        /* ── grid ── */
        .pc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── card ── */
        .pc-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          display: block;
          aspect-ratio: 3/4;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(30,58,138,0.10);
          animation: pcFadeUp 0.5s ease both;
        }
        .pc-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 40px rgba(30,58,138,0.2);
        }

        /* background image */
        .pc-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }
        .pc-card:hover .pc-card-bg { transform: scale(1.07); }

        /* dark gradient overlay */
        .pc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15,30,69,0.92) 0%,
            rgba(30,58,138,0.45) 45%,
            rgba(30,58,138,0.1) 100%
          );
          transition: opacity 0.3s;
        }
        .pc-card:hover .pc-card-overlay {
          background: linear-gradient(
            to top,
            rgba(15,30,69,0.96) 0%,
            rgba(30,58,138,0.55) 50%,
            rgba(30,58,138,0.15) 100%
          );
        }

        /* tag pill */
        .pc-card-tag {
          position: absolute;
          top: 14px; left: 14px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #1E3A8A;
          background: #E5E7EB;
          padding: 3px 10px;
          border-radius: 20px;
          z-index: 2;
        }

        /* icon circle */
        .pc-card-icon {
          position: absolute;
          top: 14px; right: 14px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-size: 1rem;
          z-index: 2;
          backdrop-filter: blur(4px);
          transition: background 0.2s, transform 0.2s;
        }
        .pc-card:hover .pc-card-icon {
          background: #3B82F6;
          border-color: #3B82F6;
          transform: scale(1.1);
        }

        /* bottom content */
        .pc-card-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 18px;
          z-index: 2;
        }
        .pc-card-count {
          font-size: 0.72rem;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pc-card-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.3px;
          margin-bottom: 10px;
        }
        .pc-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          background: rgba(59,130,246,0.35);
          border: 1px solid rgba(96,165,250,0.5);
          padding: 6px 14px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
          transition: background 0.2s, gap 0.2s;
        }
        .pc-card:hover .pc-card-btn {
          background: #3B82F6;
          border-color: #3B82F6;
          gap: 9px;
        }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .pc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 0 20px; }
          .pc-hd { padding: 0 20px; }
        }
        @media (max-width: 560px) {
          .pc-wrap { padding: 40px 0 48px; }
          .pc-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 0 16px; }
          .pc-hd { padding: 0 16px; margin-bottom: 24px; }
          .pc-card { aspect-ratio: 2/3; border-radius: 16px; }
          .pc-card-name { font-size: 1rem; }
          .pc-card-body { padding: 14px; }
          .pc-card-btn { font-size: 0.72rem; padding: 5px 11px; }
        }

        @keyframes pcFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="pc-wrap">

        <div className="pc-hd">
          <div className="pc-hd-left">
            <div className="pc-accent-bar" />
            <div className="pc-hd-text">
              <div className="pc-label"><FiTrendingUp /> Explore</div>
              <div className="pc-title">Popular Categories</div>
            </div>
          </div>
          <Link to="/categories" className="pc-browse">
            Browse All Products <FiArrowRight />
          </Link>
        </div>

        <div className="pc-grid">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.path}
              className="pc-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="pc-card-bg"
                style={{ backgroundImage: `url(${cat.img})` }}
              />

              <div className="pc-card-overlay" />

              <span className="pc-card-tag">{cat.tag}</span>

              <div className="pc-card-icon">{cat.icon}</div>

              <div className="pc-card-body">
                <div className="pc-card-count">
                  <FiTrendingUp /> {cat.count}
                </div>
                <div className="pc-card-name">{cat.name}</div>
                <div className="pc-card-btn">
                  Shop Now <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}

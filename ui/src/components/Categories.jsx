import React, { useRef, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Grocery",
    path: "/categories/grocery",
    img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1000&auto=format&fit=crop&q=60",
    count: "240+ items",
  },
  {
    name: "Hampers",
    path: "/categories/hampers",
    img: "https://plus.unsplash.com/premium_photo-1663928246639-86813155169f?w=1000&auto=format&fit=crop&q=60",
    count: "80+ items",
  },
  {
    name: "Food",
    path: "/categories/food",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=60",
    count: "310+ items",
  },
  {
    name: "Stationeries",
    path: "/categories/stationeries",
    img: "https://images.unsplash.com/photo-1568871391149-449702439177?w=1000&auto=format&fit=crop&q=60",
    count: "150+ items",
  },
  {
    name: "Home & Lifestyle",
    path: "/categories/home",
    img: "https://images.unsplash.com/photo-1556185781-a47769abb7ee?w=1000&auto=format&fit=crop&q=60",
    count: "420+ items",
  },
];

export default function Categories() {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / categories.length));
    setActiveIdx(Math.min(idx, categories.length - 1));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .cat-wrap {
          font-family: 'DM Sans', sans-serif;
          padding: 48px 0 40px;
          background: #fff;
        }

        .cat-hd {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 32px;
          margin-bottom: 32px;
          gap: 12px;
        }
        .cat-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #3B82F6;
          margin-bottom: 5px;
        }
        .cat-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 800;
          color: #1E3A8A;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }
        .cat-see-all {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #3B82F6;
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 1.5px solid transparent;
          padding-bottom: 1px;
          transition: gap 0.2s, color 0.2s, border-color 0.2s;
        }
        .cat-see-all:hover { gap: 9px; color: #1E3A8A; border-color: #1E3A8A; }

        /* Desktop: 5-col even grid */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          padding: 8px 32px 4px;
        }

        /* Mobile scroll track — hidden on desktop */
        .cat-track { display: none; }

        /* Shared card */
        .cat-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: catFadeIn 0.45s ease both;
        }
        .cat-card:hover { transform: translateY(-6px); }

        .cat-img-ring {
          width: 130px; height: 130px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #3B82F6, #60A5FA);
          box-shadow: 0 4px 18px rgba(59,130,246,0.22);
          transition: box-shadow 0.25s, background 0.25s;
          position: relative;
        }
        .cat-card:hover .cat-img-ring {
          box-shadow: 0 10px 30px rgba(30,58,138,0.28);
          background: linear-gradient(135deg, #1E3A8A, #3B82F6);
        }

        .cat-img-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          padding: 3px;
        }
        .cat-img-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: transform 0.4s ease;
          display: block;
        }
        .cat-card:hover .cat-img-inner img { transform: scale(1.1); }

        .cat-count {
          position: absolute;
          bottom: 3px; right: 3px;
          background: #1E3A8A;
          color: #fff;
          font-size: 0.58rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          white-space: nowrap;
          border: 2px solid #fff;
          letter-spacing: 0.3px;
        }

        .cat-name {
          margin-top: 13px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f1e45;
          text-align: center;
          line-height: 1.3;
          max-width: 120px;
          transition: color 0.2s;
        }
        .cat-card:hover .cat-name { color: #1E3A8A; }

        /* Dots — mobile only */
        .cat-dots {
          display: none;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
        }
        .cat-dot {
          width: 6px; height: 6px;
          border-radius: 3px;
          background: #E5E7EB;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: width 0.3s, background 0.3s;
        }
        .cat-dot.on { width: 18px; background: #3B82F6; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .cat-hd { padding: 0 16px; margin-bottom: 24px; }
          .cat-grid { display: none; }

          .cat-track {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            padding: 8px 16px 12px;
            -webkit-overflow-scrolling: touch;
          }
          .cat-track::-webkit-scrollbar { display: none; }
          .cat-track .cat-card {
            flex-shrink: 0;
            width: 110px;
            scroll-snap-align: start;
          }
          .cat-track .cat-img-ring { width: 96px; height: 96px; }
          .cat-track .cat-name { font-size: 0.78rem; max-width: 100px; }

          .cat-dots { display: flex; }
        }

        @keyframes catFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="cat-wrap">

        <div className="cat-hd">
          <div>
            <div className="cat-label"><FiGrid /> Shop by</div>
            <div className="cat-title">Top Categories</div>
          </div>
          <Link to="/categories" className="cat-see-all">All categories →</Link>
        </div>

        <div className="cat-grid">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path} className="cat-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="cat-img-ring">
                <div className="cat-img-inner">
                  <img src={cat.img} alt={cat.name} loading="lazy" />
                </div>
                <span className="cat-count">{cat.count}</span>
              </div>
              <div className="cat-name">{cat.name}</div>
            </Link>
          ))}
        </div>

        <div className="cat-track" ref={scrollRef} onScroll={onScroll}>
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path} className="cat-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="cat-img-ring">
                <div className="cat-img-inner">
                  <img src={cat.img} alt={cat.name} loading="lazy" />
                </div>
                <span className="cat-count">{cat.count}</span>
              </div>
              <div className="cat-name">{cat.name}</div>
            </Link>
          ))}
        </div>

        <div className="cat-dots">
          {categories.map((_, i) => (
            <button key={i} className={`cat-dot${i === activeIdx ? " on" : ""}`} aria-label={`Category ${i + 1}`} />
          ))}
        </div>

      </section>
    </>
  );
}

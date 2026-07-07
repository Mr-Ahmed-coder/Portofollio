import { useEffect, useRef, useState } from "react";

const highlights = [
  { icon: "FS", title: "Full-Stack Developer", text: "Frontend and backend workflows built with practical production needs in mind." },
  { icon: "M", title: "MERN Stack Projects", text: "React, Node.js, Express, and MongoDB applications with clean structure." },
  { icon: "B", title: "Business Systems", text: "Tools that help teams manage daily operations, data, and customer workflows." },
  { icon: "P", title: "Frontend-Only Portfolio", text: "A fast, polished Vite portfolio prepared for clean static deployment." },
];

const quickStats = [
  "8+ Projects Built",
  "MERN Stack Focus",
  "Real Client Systems",
  "Uganda & Kenya Market Focus",
];

const About = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #0B0B0B 0%, #111111 100%)",
        padding: "100px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto auto 8% 12%",
          width: "360px",
          height: "360px",
          background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="about-premium-grid"
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(360px, 1.1fr)",
          gap: "42px",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#0ea5e9",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              padding: "6px 16px",
              borderRadius: "4px",
              marginBottom: "18px",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            ABOUT
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: 1.08,
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "22px",
            }}
          >
            Practical software for <span style={{ color: "#0ea5e9" }}>real business needs</span>
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "16px",
              lineHeight: "1.8",
              maxWidth: "620px",
              marginBottom: "28px",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Hi, I'm Ahmed Mohamed, a full-stack developer focused on building modern web applications and practical business management systems. I work mainly with React, Node.js, Express, and MongoDB, and I enjoy turning real business problems into clean, usable software.
          </p>

          <div className="about-stat-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {quickStats.map((stat) => (
              <span
                key={stat}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "34px",
                  padding: "0 13px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  fontWeight: "700",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        <div
          className="about-highlight-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
          }}
        >
          {highlights.map((item) => (
            <article
              key={item.title}
              className="about-highlight-card"
              style={{
                minHeight: "158px",
                padding: "22px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.24)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                transition: "transform 0.28s ease, border-color 0.28s ease, background 0.28s ease, box-shadow 0.28s ease",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(14,165,233,0.12)",
                  border: "1px solid rgba(14,165,233,0.22)",
                  color: "#38bdf8",
                  fontSize: "13px",
                  fontWeight: "900",
                  fontFamily: "'Barlow', sans-serif",
                  marginBottom: "18px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "17px",
                  fontWeight: "800",
                  fontFamily: "'Barlow', sans-serif",
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: "1.65",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .about-highlight-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.075) !important;
          border-color: rgba(14,165,233,0.24) !important;
          box-shadow: 0 26px 72px rgba(0,0,0,0.32), 0 0 32px rgba(14,165,233,0.08) !important;
        }

        @media (max-width: 980px) {
          .about-premium-grid {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }
        }

        @media (max-width: 640px) {
          .about-highlight-grid {
            grid-template-columns: 1fr !important;
          }

          .about-stat-row {
            gap: 8px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-highlight-card,
          .about-premium-grid * {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
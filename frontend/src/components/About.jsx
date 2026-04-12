import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "5 +", label: "Coursera" },
  { value: "3 +", label: "Years Experience" },
  { value: "30 +", label: "Projects Build" },
];

const About = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-me"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #080d1e 0%, #0d1535 100%)",
        padding: "100px 60px",
        display: "flex",
        alignItems: "center",
        gap: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", bottom: "0", left: "25%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* LEFT — Photo */}
      <div style={{
        flex: "0 0 380px",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-50px)",
        
        transition: "all 0.8s ease",
      }}>
        {/* Decorative ring */}
        <div style={{
          position: "absolute",
          bottom: "-20px", left: "-20px",
          width: "220px", height: "220px",
          borderRadius: "50%",
          border: "none",
          background: `conic-gradient(
            from 0deg,
            #0ea5e9 0deg,
            transparent 60deg,
            #0ea5e9 120deg,
            transparent 180deg,
            #0ea5e9 240deg,
            transparent 300deg,
            #0ea5e9 360deg
          )`,
          opacity: 0.25,
          animation: "spin 12s linear infinite",
        }} />

        {/* Photo box */}
        <div style={{
          width: "360px",
          height: "440px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 0 40px rgba(14,165,233,0.08)",
          position: "relative", zIndex: 2,
          backgroundImage: "url('/src/images/image2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "4px solid skyblue",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "12px",
        }}>
          {/* 👇 Replace with your actual image */}
          
          {/* <img s  src="images/image1.jpeg" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> */}
          <div style={{ fontSize: "64px" }}></div>
          <p style={{ color: "#475569", fontSize: "13px", fontFamily: "'Barlow', sans-serif" }}>
            
          </p>
        </div>
      </div>

      {/* RIGHT — Content */}
      <div style={{
        flex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(50px)",
        transition: "all 0.8s ease 0.2s",
      }}>
        {/* Section badge */}
        <div style={{
          display: "inline-block",
          background: "rgba(14,165,233,0.12)",
          border: "1px solid rgba(14,165,233,0.3)",
          color: "#0ea5e9",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "2px",
          padding: "6px 16px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          ABOUT US
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 46px)",
          fontWeight: "900",
          color: "#ffffff",
          lineHeight: 1.15,
          fontFamily: " sans-serif",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          I AM Full-Stack {" "}
          <span style={{ color: "#0ea5e9" }}><br />Developer</span>{" "}
          
        </h2>

        {/* Description */}
        <p style={{
          color: "#94a3b8",
          fontSize: "15px",
          lineHeight: "1.85",
          maxWidth: "500px",
          marginBottom: "36px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          I am a passionate and growing developer focused on building modern web
          applications with clean code, responsive interfaces, and practical
          solutions that create real value for users and businesses.
        </p>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: "16px",
          marginBottom: "36px",
          flexWrap: "wrap",
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: "18px 24px",
              background: "rgba(14,165,233,0.06)",
              border: "1px solid rgba(14,165,233,0.18)",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "110px",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(14,165,233,0.12)";
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(14,165,233,0.06)";
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                fontSize: "26px", fontWeight: "900",
                color: "#ffffff",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "1px",
              }}>{stat.value}</div>
              <div style={{
                fontSize: "11px", color: "#64748b",
                fontFamily: "'Barlow', sans-serif",
                marginTop: "4px", letterSpacing: "0.5px",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "14px 32px",
          background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "1px",
          cursor: "pointer",
          fontFamily: "'Barlow', sans-serif",
          boxShadow: "0 0 30px rgba(14,165,233,0.35)",
          transition: "all 0.3s ease",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 0 45px rgba(14,165,233,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.35)";
          }}
            onClick={() => window.location.href = "mailto:engahmedmohamedali24@gmail.com"}

        >
          GET IN TOUCH <span>→</span>
          
        </button>
        
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default About;

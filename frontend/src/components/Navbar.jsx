import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About Me", "Skills", "Projects", "Services", "Contact"];

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: "18px 60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(8, 13, 30, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(14, 165, 233, 0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "900", color: "#fff", fontSize: "16px",
          boxShadow: "0 0 20px rgba(14,165,233,0.4)",
        }}>A</div>
        <span style={{
          fontSize: "22px", fontWeight: "800",
          color: "#fff", letterSpacing: "1px",
          fontFamily: " sans-serif",
        }}>Ahmed</span>
      </div>

      {/* Desktop Nav Links */}
      <ul style={{
        display: "flex", gap: "36px", listStyle: "none",
        margin: 0, padding: 0,
      }}>
        {navLinks.map((link, i) => (
          <li key={i}>
            <a
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              style={{
                color: i === 0 ? "#0ea5e9" : "#cbd5e1",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "0.5px",
                fontFamily: " sans-serif",
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={e => e.target.style.color = "#0ea5e9"}
              onMouseLeave={e => e.target.style.color = i === 0 ? "#0ea5e9" : "#cbd5e1"}
            >
              {link}
              {i === 0 && (
                <span style={{
                  position: "absolute", bottom: "-2px", left: 0, right: 0,
                  height: "2px", background: "#0ea5e9", borderRadius: "2px",
                }} />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button style={{
        padding: "12px 28px",
        background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "1px",
        cursor: "pointer",
        fontFamily: "'Barlow', sans-serif",
        boxShadow: "0 0 25px rgba(14,165,233,0.35)",
        transition: "all 0.3s ease",
      }}
        onMouseEnter={e => {
          
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 0 35px rgba(14,165,233,0.55)";
        }}
        onMouseLeave={e => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 0 25px rgba(14,165,233,0.35)";
        }}
          onClick={() => window.open("https://wa.me/25674844459", "_blank")}

      >
        LET'S TALK
      </button>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About Me", "Skills", "Projects", "Services", "Contact"];

  return (
    <nav className="nav-padding" style={{
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
      <ul className="hide-on-mobile" style={{
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
      <button className="hide-on-mobile" style={{
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

      {/* Mobile Hamburger Icon */}
      <button 
        className="hide-on-desktop"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 1001,
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div style={{ width: "24px", height: "2px", background: "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <div style={{ width: "24px", height: "2px", background: "#fff", opacity: menuOpen ? 0 : 1 }} />
        <div style={{ width: "24px", height: "2px", background: "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {/* Mobile Menu Dropdown */}
      <div className="hide-on-desktop" style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "rgba(8, 13, 30, 0.98)",
        backdropFilter: "blur(10px)",
        transform: menuOpen ? "translateY(0)" : "translateY(-150%)",
        visibility: menuOpen ? "visible" : "hidden",
        opacity: menuOpen ? 1 : 0,
        transition: "all 0.4s ease",
        borderBottom: "1px solid rgba(14, 165, 233, 0.15)",
        zIndex: 998,
        padding: "30px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}>
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: "600",
              textDecoration: "none",
              fontFamily: " sans-serif",
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

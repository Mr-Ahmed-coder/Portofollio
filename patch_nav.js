const fs = require('fs');

const file = 'frontend/src/components/Navbar.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add menu state
content = content.replace('const [scrolled, setScrolled] = useState(false);', 'const [scrolled, setScrolled] = useState(false);\n  const [menuOpen, setMenuOpen] = useState(false);');

// Add nav className
content = content.replace('    <nav style={{', '    <nav className="nav-padding" style={{');

// Add class to hide ul on mobile
content = content.replace('<ul style={{', '<ul className="hide-on-mobile" style={{');

// Add Hamburger menu and Mobile Dropdown at the end before </nav>
const mobileMenu = `
      {/* Mobile Hamburger Icon */}
      <button 
        className="hide-on-desktop"
        style={{
          display: "none",
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

      {/* Mobile Menu Overlay */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(8, 13, 30, 0.98)",
        backdropFilter: "blur(10px)",
        transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}>
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={\`#\${link.toLowerCase().replace(" ", "-")}\`}
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
`;
content = content.replace('    </nav>', mobileMenu + '    </nav>');

// We need to add a css override for the hamburger display. Instead of adding to index.css, we inject class directly if we want, or rely on index.css.
fs.writeFileSync(file, content);
console.log('Navbar updated');

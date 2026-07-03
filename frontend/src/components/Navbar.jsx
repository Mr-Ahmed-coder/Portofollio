import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "About", target: "about-me" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Services", target: "services" },
  { label: "Contact", target: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionIds = useMemo(() => navItems.map((item) => item.target), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.12, 0.24, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const scrollToSection = (target) => {
    const section = document.getElementById(target);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${target}`);
    setActiveSection(target);
    setMenuOpen(false);
  };

  const openHireMe = () => {
    window.open("https://wa.me/25674844459", "_blank", "noopener,noreferrer");
    setMenuOpen(false);
  };

  return (
    <header className={scrolled || menuOpen ? "site-header is-scrolled" : "site-header"}>
      <nav className="site-nav" aria-label="Primary navigation">
        <button type="button" className="brand-mark" onClick={() => scrollToSection("home")} aria-label="Ahmed home">
          <span className="brand-logo" aria-hidden="true">A</span>
          <span className="brand-copy">
            <strong>Ahmed</strong>
            <em>Developer Portfolio</em>
          </span>
        </button>

        <div className="desktop-nav-links" role="list">
          {navItems.map((item) => (
            <button
              key={item.target}
              type="button"
              role="listitem"
              className={activeSection === item.target ? "nav-link active" : "nav-link"}
              onClick={() => scrollToSection(item.target)}
              aria-current={activeSection === item.target ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button type="button" className="hire-button desktop-hire" onClick={openHireMe}>
            Hire Me
          </button>

          <button
            type="button"
            className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}>
        <div className="mobile-menu-panel">
          {navItems.map((item) => (
            <button
              key={item.target}
              type="button"
              className={activeSection === item.target ? "mobile-nav-link active" : "mobile-nav-link"}
              onClick={() => scrollToSection(item.target)}
              aria-current={activeSection === item.target ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="hire-button mobile-hire" onClick={openHireMe}>
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

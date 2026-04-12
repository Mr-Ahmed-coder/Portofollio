import { useState, useEffect, useRef } from "react";
import api, { resolveMediaUrl } from "../lib/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);

  // Fetch projects from the backend
  useEffect(() => {
    api
      .get("/api/projects")
      .then((res) => {
        setProjects(res.data.projects);
        setError("");
      })
      .catch(() => {
        setProjects([]);
        setError("Projects are unavailable right now. Please try again later.");
      });
  }, []);

  // Scroll into view animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Show 3 cards at a time
  const cardsPerPage = 3;
  const totalPages = Math.ceil(projects.length / cardsPerPage);
  const visibleProjects = projects.slice(
    activeIndex * cardsPerPage,
    activeIndex * cardsPerPage + cardsPerPage
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #0d1535 0%, #080d1e 100%)",
        padding: "100px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", right: "0",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Section label */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
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
          marginBottom: "14px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          MY WORK
        </div>

        <h2 className="section-title" style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: "900",
          color: "#ffffff",
          fontFamily: "'Barlow Condensed', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "50px",
        }}>
          RECENT PROJECT
        </h2>
      </div>

      {/* Project Cards */}
      {error && (
        <div style={{
          marginBottom: "24px",
          padding: "14px 18px",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: "10px",
          color: "#f87171",
          fontSize: "13px",
          fontFamily: "'Barlow', sans-serif",
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease 0.2s",
      }}>
        {visibleProjects.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>

      {!error && projects.length === 0 && (
        <div style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "14px",
          fontFamily: "'Barlow', sans-serif",
          marginTop: "8px",
        }}>
          No projects have been published yet.
        </div>
      )}

      {/* Carousel Dots */}
      {totalPages > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                border: "none",
                background: i === activeIndex ? "#0ea5e9" : "rgba(14,165,233,0.25)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Individual Project Card
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0f1b30",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(14,165,233,0.35)" : "rgba(14,165,233,0.12)"}`,
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(14,165,233,0.1)" : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s ease",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Image area */}
      <div style={{
        height: "200px",
        background: "linear-gradient(135deg, #0d1f3c, #162444)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "8px",
          }}>
            <div style={{ fontSize: "40px", opacity: 0.4 }}>🖥️</div>
            <span style={{ color: "#334155", fontSize: "12px", fontFamily: "'Barlow', sans-serif" }}>
              Project Image
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(14,165,233,0.08)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />
      </div>

      {/* Card Footer */}
      <div style={{
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h3 style={{
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.5px",
            marginBottom: "4px",
          }}>
            {project.title}
          </h3>
          <p style={{
            color: "#64748b",
            fontSize: "12px",
            fontFamily: "'Barlow', sans-serif",
          }}>
            {project.description}
          </p>
        </div>

        {/* Arrow button */}
        <a
          href={project.liveUrl || "#"}
          target="_blank"
          rel="noreferrer"
          style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            fontSize: "16px",
            textDecoration: "none",
            flexShrink: 0,
            boxShadow: "0 0 20px rgba(14,165,233,0.35)",
            transition: "all 0.3s ease",
            transform: hovered ? "scale(1.12)" : "scale(1)",
          }}
        >
          →
        </a>
      </div>
    </div>
  );
};

export default Projects;

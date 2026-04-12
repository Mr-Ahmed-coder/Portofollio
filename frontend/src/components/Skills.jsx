import { useEffect, useRef, useState } from "react";
import api from "../lib/api";

const fallbackSkills = [
  {
    category: "Frontend",
    description: "Building modern, responsive user interfaces for smooth user experiences.",
    skills: [
      { name: "React", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 88 },
    ],
  },
  {
    category: "Backend",
    description: "Creating reliable server-side logic and APIs for scalable web applications.",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 82 },
    ],
  },
  {
    category: "Database",
    description: "Managing application data with flexible and efficient document databases.",
    skills: [
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    category: "Other",
    description: "Supporting tools and practices that strengthen delivery and integration.",
    skills: [
      { name: "Git", level: 86 },
      { name: "API Integration", level: 88 },
      { name: "Responsive Design", level: 90 },
    ],
  },
];

const normalizeSkills = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return fallbackSkills;
  }

  const grouped = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = {
        category,
        description: getCategoryDescription(category),
        skills: [],
      };
    }

    acc[category].skills.push({
      name: item.name,
      level: typeof item.proficiency === "number" ? item.proficiency : 80,
    });

    return acc;
  }, {});

  const categories = Object.values(grouped);
  return categories.length > 0 ? categories : fallbackSkills;
};

const getCategoryDescription = (category) => {
  switch (category.toLowerCase()) {
    case "frontend":
      return "Building modern, responsive user interfaces for smooth user experiences.";
    case "backend":
      return "Creating reliable server-side logic and APIs for scalable web applications.";
    case "database":
      return "Managing application data with flexible and efficient document databases.";
    default:
      return "Supporting tools and practices that strengthen delivery and integration.";
  }
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [skillGroups, setSkillGroups] = useState(fallbackSkills);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;

    const loadSkills = async () => {
      try {
        const { data } = await api.get("/api/skills");
        if (active) {
          setSkillGroups(normalizeSkills(data));
        }
      } catch {
        if (active) {
          setSkillGroups(fallbackSkills);
        }
      }
    };

    loadSkills();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #0d1535 0%, #091124 100%)",
        padding: "100px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
          marginBottom: "52px",
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
            marginBottom: "14px",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          SKILLS
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: "900",
            color: "#ffffff",
            fontFamily: "'Barlow Condensed', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Modern <span style={{ color: "#0ea5e9" }}>Tech Stack</span> and Core Strengths
        </h2>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "680px",
            lineHeight: "1.8",
            fontSize: "15px",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          A practical blend of frontend, backend, database, and collaboration skills
          used to build clean, responsive, and reliable web applications.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {skillGroups.map((group, index) => (
          <div
            key={group.category}
            style={{
              background: "rgba(15,27,48,0.82)",
              border: "1px solid rgba(14,165,233,0.14)",
              borderRadius: "18px",
              padding: "28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.5s ease ${index * 0.1}s`,
              boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.24)",
                color: "#0ea5e9",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Barlow', sans-serif",
                marginBottom: "16px",
              }}
            >
              {group.category}
            </div>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                lineHeight: "1.75",
                fontFamily: "'Barlow', sans-serif",
                marginBottom: "24px",
              }}
            >
              {group.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {group.skills.map((skill) => (
                <div key={`${group.category}-${skill.name}`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#e2e8f0",
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        color: "#38bdf8",
                        fontSize: "12px",
                        fontWeight: "700",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "9px",
                      borderRadius: "999px",
                      background: "rgba(148,163,184,0.14)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        borderRadius: "999px",
                        background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                        boxShadow: "0 0 16px rgba(14,165,233,0.28)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

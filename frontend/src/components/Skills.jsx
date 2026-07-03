import { useEffect, useMemo, useRef, useState } from "react";
import { currentlyLearning, skillCategories, solutions, strongestSkills } from "../data/skills";

const SkillIcon = ({ skill }) => {
  if (skill.icon) {
    return (
      <span className="skill-icon-frame" aria-hidden="true">
        <img src={skill.icon} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  return (
    <span className="skill-icon-frame skill-icon-letter" aria-hidden="true">
      {skill.iconLabel || skill.name.slice(0, 2).toUpperCase()}
    </span>
  );
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
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

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skillCategories
      .filter((category) => activeCategory === "all" || category.id === activeCategory)
      .map((category) => {
        if (!normalizedQuery) return category;

        return {
          ...category,
          skills: category.skills.filter((skill) =>
            `${skill.name} ${category.title}`.toLowerCase().includes(normalizedQuery)
          ),
        };
      })
      .filter((category) => category.skills.length > 0);
  }, [activeCategory, query]);

  const totalSkills = skillCategories.reduce((total, category) => total + category.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-showcase section-padding ${visible ? "is-visible" : ""}`}
    >
      <div className="skills-showcase-inner">
        <div className="skills-hero-panel">
          <div>
            <span className="skills-eyebrow">Skills & Capabilities</span>
            <h2 className="section-title">Modern Stack. Practical Systems.</h2>
            <p>
              A recruiter-friendly view of the tools, workflows, and business solutions I use
              to build responsive interfaces, APIs, dashboards, mobile apps, and management systems.
            </p>
          </div>

          <div className="skills-strength-panel" aria-label="Strongest skills">
            <span>Strongest focus</span>
            <div>
              {strongestSkills.map((skill) => (
                <strong key={skill}>{skill}</strong>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-toolbar" aria-label="Skills filters">
          <div className="skills-search-box">
            <span aria-hidden="true">Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${totalSkills} skills...`}
              aria-label="Search skills"
            />
          </div>

          <div className="skills-filter-row">
            <button
              type="button"
              className={activeCategory === "all" ? "active" : ""}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={activeCategory === category.id ? "active" : ""}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.title.replace(" Development", "")}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-grid">
          {filteredCategories.map((category, index) => (
            <article
              key={category.id}
              className="skill-category-card"
              style={{ "--skill-accent": category.accent, transitionDelay: `${index * 55}ms` }}
            >
              <div className="skill-card-header">
                <span className="skill-card-marker" aria-hidden="true" />
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.summary}</p>
                </div>
              </div>

              <div className="skill-chip-grid">
                {category.skills.map((skill) => (
                  <div key={skill.name} className={skill.strong ? "skill-chip strong" : "skill-chip"}>
                    <SkillIcon skill={skill} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="skills-empty-state">
            No matching skills found. Try another search term.
          </div>
        )}

        <div className="skills-bottom-grid">
          <div className="solutions-panel">
            <div className="skills-section-heading">
              <span>Solutions I Build</span>
              <h3>Business-ready systems, not just technology demos.</h3>
            </div>

            <div className="solution-card-grid">
              {solutions.map((solution) => (
                <article key={solution.title} className="solution-card">
                  <h4>{solution.title}</h4>
                  <p>{solution.description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="learning-panel">
            <span>Currently Learning</span>
            <h3>Sharpening the next layer</h3>
            <div>
              {currentlyLearning.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;


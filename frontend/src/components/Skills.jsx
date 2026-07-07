import { useEffect, useRef, useState } from "react";
import { currentlyLearning, skillCategories } from "../data/skills";

const SkillIcon = ({ skill }) => {
  if (skill.icon) {
    return <img src={skill.icon} alt="" loading="lazy" decoding="async" />;
  }

  return <span aria-hidden="true">{skill.iconLabel || skill.name.slice(0, 2).toUpperCase()}</span>;
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-showcase section-padding ${visible ? "is-visible" : ""}`}
      aria-labelledby="skills-title"
    >
      <div className="skills-showcase-inner">
        <div className="skills-heading-panel">
          <span className="skills-eyebrow">Technical Expertise</span>
          <h2 id="skills-title" className="section-title">Technical Skills</h2>
          <p>
            The technologies, tools, and frameworks I use to build scalable, modern applications.
          </p>
        </div>

        <div className="skills-grid" role="list" aria-label="Technical skill categories">
          {skillCategories.map((category, index) => (
            <article
              key={category.id}
              className="skill-category-card"
              role="listitem"
              style={{ "--skill-accent": category.accent, "--skill-delay": `${index * 85}ms` }}
            >
              <div className="skill-card-header">
                <span className="skill-card-icon" aria-hidden="true">{category.iconLabel}</span>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>

              <ul className="skill-badge-grid" aria-label={`${category.title} technologies`}>
                {category.skills.map((skill) => (
                  <li key={skill.name} className="skill-tech-badge" tabIndex="0">
                    <span className="skill-tech-icon" aria-hidden="true">
                      <SkillIcon skill={skill} />
                    </span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="learning-panel" aria-labelledby="learning-title">
          <div>
            <span>Currently Learning</span>
            <h3 id="learning-title">Sharpening the next layer</h3>
          </div>

          <ul>
            {currentlyLearning.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Skills;
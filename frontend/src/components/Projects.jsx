import { useEffect, useMemo, useRef, useState } from "react";
import projectsData, { projectFilters } from "../data/projects";

const getVideoFrameTime = (duration) => {
  if (!Number.isFinite(duration) || duration <= 0) return 0.9;
  return Math.min(Math.max(duration * 0.24, 0.9), 3.4);
};

const getFocusableElements = (container) => {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, video[controls], [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
};

const VideoThumbnail = ({ project, onReady }) => {
  const videoRef = useRef(null);
  const capturedRef = useRef(false);

  useEffect(() => {
    capturedRef.current = false;
  }, [project.video]);

  const captureFrame = () => {
    const video = videoRef.current;
    if (!video || capturedRef.current || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    const maxWidth = 1040;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedRef.current = true;

    try {
      onReady(canvas.toDataURL("image/webp", 0.82));
    } catch {
      onReady(canvas.toDataURL("image/jpeg", 0.78));
    }
  };

  return (
    <video
      ref={videoRef}
      src={project.video}
      preload="metadata"
      muted
      playsInline
      className="project-thumb-source"
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        video.currentTime = getVideoFrameTime(video.duration);
      }}
      onSeeked={captureFrame}
      onLoadedData={captureFrame}
    />
  );
};

const ProjectCard = ({ project, index, onOpen }) => {
  const [thumbnail, setThumbnail] = useState(project.thumbnail || "");
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  const openProject = () => onOpen(project);

  return (
    <article
      ref={cardRef}
      className="project-showcase-card"
      style={{ transitionDelay: `${index * 70}ms` }}
      onPointerMove={handlePointerMove}
    >
      <VideoThumbnail project={project} onReady={setThumbnail} />

      <button
        type="button"
        className="project-media-button"
        onClick={openProject}
        aria-label={`Open ${project.title} project details`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={`${project.title} video thumbnail`} className="project-cover-image" loading="lazy" />
        ) : (
          <div className="project-cover-loading" aria-hidden="true" />
        )}
        <div className="project-cover-gradient" aria-hidden="true" />
        <div className="project-play-badge" aria-hidden="true">
          <span />
        </div>
        <div className="project-cover-copy">
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
      </button>

      <div className="project-card-body">
        <div className="project-status-row">
          <span className="project-meta-pill">{project.year}</span>
          <span className="project-status-badge">{project.status}</span>
        </div>

        <p>{project.description}</p>

        <div className="project-tech-row" aria-label={`${project.title} technologies`}>
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-card-actions">
          <button type="button" className="project-card-link" onClick={openProject}>
            View Details
          </button>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card-ghost-link">
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card-ghost-link">
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(panelRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasLiveUrl = Boolean(project.liveUrl);
  const hasGithubUrl = Boolean(project.githubUrl);

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button type="button" className="project-modal-backdrop" onClick={onClose} aria-label="Close project details" />
      <div className="project-modal-panel" ref={panelRef}>
        <div className="project-modal-header">
          <div>
            <span>{project.category}</span>
            <h3 id="project-modal-title">{project.title}</h3>
          </div>
          <button ref={closeButtonRef} type="button" className="project-modal-close" onClick={onClose} aria-label="Close project details">
            Close
          </button>
        </div>

        <div className="project-modal-grid">
          <div className="project-video-shell">
            <video src={project.video} controls playsInline preload="metadata" />
          </div>

          <div className="project-details-panel">
            <div className="project-modal-meta" aria-label="Project information">
              <span>{project.year}</span>
              <span>{project.status}</span>
              {project.client && <span>{project.client}</span>}
            </div>

            <p className="project-long-description">{project.longDescription}</p>

            <div className="project-detail-block">
              <h4>Technologies</h4>
              <div className="project-tech-list">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-detail-block">
              <h4>Features</h4>
              <ul className="project-feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-detail-block">
              <h4>Challenges Solved</h4>
              <ul className="project-feature-list project-challenge-list">
                {project.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="project-action-row">
              {hasLiveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-primary-action">
                  Live Demo
                </a>
              )}
              {hasGithubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-secondary-action">
                  GitHub
                </a>
              )}
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="project-secondary-action">
                Open Demo Video
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);

  const projects = useMemo(
    () => [...projectsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    []
  );

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.filters?.includes(activeFilter) || project.category === activeFilter;

      const searchableText = [
        project.title,
        project.category,
        project.status,
        project.client,
        project.description,
        ...project.techStack,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [activeFilter, projects, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`project-showcase section-padding ${visible ? "is-visible" : ""}`}
    >
      <div className="project-showcase-inner">
        <div className="project-showcase-heading">
          <span className="project-eyebrow">Real Project Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p>
            A collection of real systems and applications I've designed and developed to solve real business problems.
          </p>
        </div>

        <div className="project-controls" aria-label="Project filters and search">
          <div className="project-filter-row" role="list" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="project-search-box">
            <span className="sr-only">Search projects by title or technology</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by project or technology"
            />
          </label>
        </div>

        <div className="project-showcase-grid" aria-live="polite">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="project-empty-state">No projects match that filter yet.</p>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;

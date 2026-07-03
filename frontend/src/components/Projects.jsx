import { useEffect, useMemo, useRef, useState } from "react";
import projectsData from "../data/projects";

const getVideoFrameTime = (duration) => {
  if (!Number.isFinite(duration) || duration <= 0) return 0.8;
  return Math.min(Math.max(duration * 0.22, 0.8), 3.2);
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
    const maxWidth = 960;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedRef.current = true;

    try {
      onReady(canvas.toDataURL("image/webp", 0.82));
    } catch {
      onReady(canvas.toDataURL("image/png"));
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
  const [thumbnail, setThumbnail] = useState("");

  return (
    <article
      className="project-showcase-card"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <VideoThumbnail project={project} onReady={setThumbnail} />

      <button
        type="button"
        className="project-media-button"
        onClick={() => onOpen(project)}
        aria-label={`View ${project.title} project details`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt="" className="project-cover-image" loading="lazy" />
        ) : (
          <div className="project-cover-loading" />
        )}
        <div className="project-cover-gradient" />
        <div className="project-play-badge" aria-hidden="true">
          <span />
        </div>
        <div className="project-cover-copy">
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
      </button>

      <div className="project-card-body">
        <p>{project.description}</p>
        <div className="project-tech-row" aria-label={`${project.title} technologies`}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <button type="button" className="project-card-link" onClick={() => onOpen(project)}>
          View case study
        </button>
      </div>
    </article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasLiveUrl = project.liveUrl && project.liveUrl !== "#";
  const hasGithubUrl = project.githubUrl && project.githubUrl !== "#";

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button type="button" className="project-modal-backdrop" onClick={onClose} aria-label="Close project details" />
      <div className="project-modal-panel">
        <div className="project-modal-header">
          <div>
            <span>{project.category}</span>
            <h3 id="project-modal-title">{project.title}</h3>
          </div>
          <button ref={closeButtonRef} type="button" className="project-modal-close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="project-modal-grid">
          <div className="project-video-shell">
            <video src={project.video} controls playsInline preload="metadata" />
          </div>

          <div className="project-details-panel">
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

            <div className="project-action-row">
              {hasLiveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-primary-action">
                  Live Demo
                </a>
              )}
              {hasGithubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-secondary-action">
                  GitHub
                </a>
              )}
              <a href={project.video} target="_blank" rel="noreferrer" className="project-secondary-action">
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
  const sectionRef = useRef(null);
  const projects = useMemo(
    () => [...projectsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    []
  );
  const featuredProject = projects.find((project) => project.featured) || projects[0];

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
          <div>
            <span className="project-eyebrow">Selected Work</span>
            <h2 className="section-title">Project Showcase</h2>
          </div>
          <p>
            A curated set of real project demos with video walkthroughs, clean case-study details,
            and fast-loading media built for a premium portfolio experience.
          </p>
        </div>

        {featuredProject && (
          <button
            type="button"
            className="project-featured-banner"
            onClick={() => setSelectedProject(featuredProject)}
          >
            <span>Featured demo</span>
            <strong>{featuredProject.title}</strong>
            <em>Watch project walkthrough</em>
          </button>
        )}

        <div className="project-showcase-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;

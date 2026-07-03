export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    summary: "Modern, responsive interfaces with component-driven React workflows.",
    accent: "#38bdf8",
    skills: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", strong: true },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", strong: true },
      { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", strong: true },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", strong: true },
      { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Responsive Design", iconLabel: "RD", strong: true },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    summary: "API development, authentication, permissions, and practical server workflows.",
    accent: "#34d399",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", strong: true },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", strong: true },
      { name: "REST API Development", iconLabel: "API", strong: true },
      { name: "JWT Authentication", iconLabel: "JWT" },
      { name: "Role-Based Access Control (RBAC)", iconLabel: "RB" },
      { name: "File Uploads", iconLabel: "UP" },
    ],
  },
  {
    id: "database",
    title: "Database",
    summary: "Document database modeling, persistence, and cloud-hosted MongoDB setups.",
    accent: "#22c55e",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", strong: true },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg", strong: true },
      { name: "MongoDB Atlas", iconLabel: "AT" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    summary: "Cross-platform mobile app development with React Native and Expo.",
    accent: "#818cf8",
    skills: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", strong: true },
      { name: "Expo", iconLabel: "EX" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    summary: "Daily development, deployment, testing, and collaboration tools.",
    accent: "#f59e0b",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", strong: true },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", strong: true },
      { name: "Vercel", iconLabel: "VC" },
      { name: "Render", iconLabel: "RN" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    ],
  },
  {
    id: "ux",
    title: "UI / UX",
    summary: "Clean interfaces for dashboards, business tools, and responsive product flows.",
    accent: "#fb7185",
    skills: [
      { name: "Responsive UI Design", iconLabel: "UI", strong: true },
      { name: "Dashboard Design", iconLabel: "DB", strong: true },
      { name: "Component-Based Architecture", iconLabel: "CB", strong: true },
      { name: "Modern User Experience", iconLabel: "UX" },
    ],
  },
  {
    id: "ai",
    title: "AI-Assisted Development",
    summary: "Using AI tools thoughtfully to speed up debugging, planning, and implementation.",
    accent: "#a78bfa",
    skills: [
      { name: "ChatGPT", iconLabel: "CG", strong: true },
      { name: "Codex", iconLabel: "CX", strong: true },
      { name: "Gemini", iconLabel: "GM" },
      { name: "Cursor AI", iconLabel: "CA" },
    ],
  },
];

export const solutions = [
  {
    title: "Supplier Management Systems",
    description: "Supplier records, inventory support, purchasing workflows, and operational dashboards.",
  },
  {
    title: "Supermarket POS Systems",
    description: "Retail sales flows, product management, receipt-friendly interactions, and store operations.",
  },
  {
    title: "School Management Systems",
    description: "Role-aware education platforms for students, staff, classes, and admin workflows.",
  },
  {
    title: "Portfolio Websites",
    description: "Premium personal websites with responsive layouts, media showcases, and contact flows.",
  },
  {
    title: "Translation Platforms",
    description: "Structured language tools and content platforms for searchable translation experiences.",
  },
  {
    title: "Custom Business Management Systems",
    description: "Purpose-built dashboards and CRUD workflows tailored to real business processes.",
  },
];

export const currentlyLearning = ["Next.js", "React Native", "Expo", "AI-assisted development workflows"];

export const strongestSkills = ["React.js", "JavaScript (ES6+)", "Node.js", "MongoDB", "Responsive UI Design"];

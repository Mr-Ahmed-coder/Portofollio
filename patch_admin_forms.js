const fs = require('fs');

// Patch AdminSkills
let skillsFile = 'frontend/src/pages/AdminSkills.jsx';
let skillsContent = fs.readFileSync(skillsFile, 'utf8');
skillsContent = skillsContent.replace(/<div style=\{\{\s*display: "grid",\s*gridTemplateColumns: "1fr 1fr",\s*gap: "16px"\s*\}\}>/, '<div className="grid-2-to-1-tablet" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>');
fs.writeFileSync(skillsFile, skillsContent);

// Patch AdminProjects
let projectsFile = 'frontend/src/pages/AdminProjects.jsx';
let projectsContent = fs.readFileSync(projectsFile, 'utf8');
projectsContent = projectsContent.replace(/<div style=\{\{\s*display: "grid",\s*gridTemplateColumns: "1fr 1fr",\s*gap: "16px"\s*\}\}>/, '<div className="grid-2-to-1-tablet" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>');
fs.writeFileSync(projectsFile, projectsContent);

console.log('patched admin forms');

const fs = require('fs');

function applyRegex(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log('patched ' + file);
  } else {
    console.log('regex failed for ' + file);
  }
}

// 1. Hero.jsx
let heroFile = 'frontend/src/components/Hero.jsx';
let content = fs.readFileSync(heroFile, 'utf8');
content = content.replace(/<section id="home" style=\{\{/g, '<section id="home" className="hero-padding flex-stack-tablet" style={{');
content = content.replace(/\{.*\n.*flex: 1, zIndex: 2,\n.*animation: "fadeInLeft.*/g, 'className="full-width text-center-mobile" $&');
content = content.replace(/<h1 style=\{\{/g, '<h1 className="hero-title" style={{');
content = content.replace(/<h2 style=\{\{/g, '<h2 className="hero-subtitle" style={{');
content = content.replace(/<div style=\{\{\s*display: "flex",\s*alignItems: "center",\s*gap: "24px",\s*flexWrap: "wrap".*\}\}>/g, '<div className="flex-stack flex-center-mobile" style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>');
content = content.replace(/<div style=\{\{\s*flex: 1,\s*display: "flex",\s*justifyContent: "center",\s*alignItems: "flex-end",/g, '<div className="hero-img-tablet" style={{\n        flex: 1,\n        display: "flex",\n        justifyContent: "center",\n        alignItems: "flex-end",');
fs.writeFileSync(heroFile, content);

// 2. About.jsx
let aboutFile = 'frontend/src/components/About.jsx';
let aboutContent = fs.readFileSync(aboutFile, 'utf8');
aboutContent = aboutContent.replace(/<section id="about-me" style=\{\{/g, '<section id="about-me" className="section-padding" style={{');
aboutContent = aboutContent.replace(/<div style=\{\{\s*display: "flex",\s*gap: "60px",\s*alignItems: "center",\s*maxWidth: "1200px",\s*margin: "0 auto"\s*\}\}>/g, '<div className="flex-stack-tablet" style={{ display: "flex", gap: "60px", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>');
aboutContent = aboutContent.replace(/<div style=\{\{\s*width: "420px",\s*flexShrink: 0,\s*position: "relative"\s*\}\}>/g, '<div className="hero-img-tablet" style={{ width: "420px", flexShrink: 0, position: "relative" }}>');
aboutContent = aboutContent.replace(/<div style=\{\{\s*flex: 1\s*\}\}>/g, '<div className="full-width" style={{ flex: 1 }}>');
aboutContent = aboutContent.replace(/<h2 style=\{\{/g, '<h2 className="section-title" style={{');
fs.writeFileSync(aboutFile, aboutContent);

// 3. Brands.jsx
let brandsFile = 'frontend/src/components/Brands.jsx';
let brandsContent = fs.readFileSync(brandsFile, 'utf8');
brandsContent = brandsContent.replace(/<div style=\{\{(.*?)padding: "40px 60px"(.*?)\}\}>/gs, '<div className="section-padding" style={{$1padding: "40px 60px"$2}}>');
brandsContent = brandsContent.replace(/<div style=\{\{(.*?)display: "flex",\s*justifyContent: "space-between"(.*?)\}\}>/gs, '<div className="flex-stack flex-center-mobile" style={{$1display: "flex", justifyContent: "space-between"$2}}>');
fs.writeFileSync(brandsFile, brandsContent);

// 4. Skills.jsx
let skillsFile = 'frontend/src/components/Skills.jsx';
let skillsContent = fs.readFileSync(skillsFile, 'utf8');
skillsContent = skillsContent.replace(/<section id="skills" style=\{\{/g, '<section id="skills" className="section-padding" style={{');
skillsContent = skillsContent.replace(/<div style=\{\{\s*display: "grid",\s*gridTemplateColumns: "repeat\(auto-fit, minmax\(150px, 1fr\)\)",/g, '<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",');
skillsContent = skillsContent.replace(/<h2 style=\{\{/g, '<h2 className="section-title" style={{');
fs.writeFileSync(skillsFile, skillsContent);

// 5. Projects.jsx
let projectsFile = 'frontend/src/components/Projects.jsx';
let projectsContent = fs.readFileSync(projectsFile, 'utf8');
projectsContent = projectsContent.replace(/<section id="projects" style=\{\{/g, '<section id="projects" className="section-padding" style={{');
projectsContent = projectsContent.replace(/<div\s*style=\{\{\s*display: "grid",\s*gridTemplateColumns: "repeat\(auto-fit, minmax\(350px, 1fr\)\)",/g, '<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",');
projectsContent = projectsContent.replace(/<h2 style=\{\{/g, '<h2 className="section-title" style={{');
fs.writeFileSync(projectsFile, projectsContent);

// 6. Services.jsx
let servicesFile = 'frontend/src/components/Services.jsx';
let servicesContent = fs.readFileSync(servicesFile, 'utf8');
servicesContent = servicesContent.replace(/<section id="services" style=\{\{/g, '<section id="services" className="section-padding" style={{');
servicesContent = servicesContent.replace(/<div style=\{\{\s*display: "grid",\s*gridTemplateColumns: "repeat\(auto-fit, minmax\(320px, 1fr\)\)",/g, '<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",');
servicesContent = servicesContent.replace(/<h2 style=\{\{/g, '<h2 className="section-title" style={{');
fs.writeFileSync(servicesFile, servicesContent);

// 7. Contact.jsx
let contactFile = 'frontend/src/components/Contact.jsx';
let contactContent = fs.readFileSync(contactFile, 'utf8');
contactContent = contactContent.replace(/<section\s*id="contact"\s*ref=\{sectionRef\}\s*style=\{\{/g, '<section id="contact" ref={sectionRef} className="section-padding" style={{');
contactContent = contactContent.replace(/<h2\s*style=\{\{/g, '<h2 className="section-title" style={{');
contactContent = contactContent.replace(/gridTemplateColumns: "repeat\(auto-fit, minmax\(320px, 1fr\)\)"/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))"');
contactContent = contactContent.replace(/gridTemplateColumns: "repeat\(auto-fit, minmax\(180px, 1fr\)\)"/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))"');
fs.writeFileSync(contactFile, contactContent);

// 8. Footer.jsx
let footerFile = 'frontend/src/components/Footer.jsx';
let footerContent = fs.readFileSync(footerFile, 'utf8');
footerContent = footerContent.replace(/<footer style=\{\{/g, '<footer className="section-padding" style={{');
footerContent = footerContent.replace(/gridTemplateColumns: "1.5fr 1fr 1fr"/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))"');
footerContent = footerContent.replace(/<div style=\{\{\s*display: "flex",\s*alignItems: "center",\s*justifyContent: "space-between",\s*flexWrap: "wrap",/g, '<div className="flex-stack flex-center-mobile" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",');
fs.writeFileSync(footerFile, footerContent);

console.log('done patching all components');

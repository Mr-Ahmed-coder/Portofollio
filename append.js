const fs = require('fs');
let css = fs.readFileSync('frontend/src/index.css', 'utf8');
css += \

/* Responsive Utility Classes Framework */
@media (max-width: 1024px) {
  .section-padding { padding: 80px 40px !important; }
  .grid-2-to-1-tablet { grid-template-columns: 1fr !important; }
  .flex-stack-tablet { flex-direction: column !important; align-items: flex-start !important; }
  .hero-img-tablet { width: 100% !important; max-width: 380px !important; margin: 0 auto !important; }
}

@media (max-width: 768px) {
  .section-padding { padding: 60px 20px !important; }
  .hero-padding { padding: 120px 20px 40px !important; }
  .flex-stack { flex-direction: column !important; align-items: flex-start !important; }
  .hide-on-mobile { display: none !important; }
  .show-on-mobile { display: flex !important; }
  .nav-padding { padding: 16px 20px !important; }
  .full-width { width: 100% !important; }
  .text-center-mobile { text-align: center !important; }
  .flex-center-mobile { align-items: center !important; justify-content: center !important; }
  /* Typography Scaling */
  .hero-title { font-size: clamp(32px, 8vw, 68px) !important; }
  .hero-subtitle { font-size: clamp(24px, 6vw, 62px) !important; min-height: 40px !important; }
  .section-title { font-size: clamp(28px, 6vw, 42px) !important; }
  .text-sm-mobile { font-size: 14px !important; }
  /* Admin sidebar */
  .admin-sidebar { position: fixed !important; transform: translateX(-100%); transition: transform 0.3s; z-index: 100; }
  .admin-sidebar.open { transform: translateX(0); }
  .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
}
\;
fs.writeFileSync('frontend/src/index.css', css);
console.log('done css');
\

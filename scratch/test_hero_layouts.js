const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const baseHtml = fs.readFileSync('Contact.html', 'utf8');

const v1Css = `
<style id="test-v1-style">
.svg-defs-hidden, .hero-diagonal-divider-line { display: none !important; }

.contact-hero-section {
  position: relative !important;
  width: 100% !important;
  min-height: calc(100vh - var(--header-height)) !important;
  height: auto !important;
  max-height: none !important;
  display: grid !important;
  grid-template-columns: 1.1fr 0.9fr !important;
  align-items: stretch !important;
  background: var(--bg-gradient-hero) !important;
  border-bottom: 1px solid var(--border-subtle) !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.contact-hero-image-pane {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 560px !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  overflow: hidden !important;
  background: #460f1c !important;
  border-right: 1px solid var(--border-subtle) !important;
}

[dir="rtl"] .contact-hero-image-pane {
  border-right: none !important;
  border-left: 1px solid var(--border-subtle) !important;
}

.hero-clipped-image-layer {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  clip-path: none !important;
  -webkit-clip-path: none !important;
  overflow: hidden !important;
}

.hero-fullbleed-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
  display: block !important;
  transform: none !important;
}

.hero-corner-status-badge {
  position: absolute !important;
  bottom: 24px !important;
  left: 24px !important;
  right: auto !important;
  z-index: 3 !important;
}

.contact-hero-container {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  padding: clamp(32px, 4vw, 56px) clamp(28px, 4.5vw, 64px) !important;
  margin: 0 !important;
  pointer-events: auto !important;
}

.contact-hero-content {
  max-width: 580px !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
`;

const htmlWithV1 = baseHtml.replace('</head>', v1Css + '</head>');
fs.writeFileSync('contact_test_temp.html', htmlWithV1, 'utf8');

execSync(`"${edgePath}" --headless --disable-gpu --window-size=1280,820 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/hero_v1_split.png" "file:///c:/Users/DELL/Desktop/Food Feast/contact_test_temp.html"`);
try { fs.unlinkSync('contact_test_temp.html'); } catch(e) {}
console.log('V1 captured successfully');

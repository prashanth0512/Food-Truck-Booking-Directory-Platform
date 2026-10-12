const { execSync } = require('child_process');
const fs = require('fs');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const baseHtml = fs.readFileSync('Contact.html', 'utf8');

execSync(`"${edgePath}" --headless --disable-gpu --window-size=1280,820 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/contact_final_desktop_light.png" "file:///c:/Users/DELL/Desktop/Food Feast/Contact.html"`);

let darkHtml = baseHtml.replace('<html lang="en">', '<html lang="en" data-theme="dark">')
  .replace('</head>', '<script>localStorage.setItem("ff_theme", "dark"); localStorage.setItem("foodfeast_theme", "dark");</script></head>');
fs.writeFileSync('contact_test_dark.html', darkHtml, 'utf8');
execSync(`"${edgePath}" --headless --disable-gpu --window-size=1280,820 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/contact_final_desktop_dark.png" "file:///c:/Users/DELL/Desktop/Food Feast/contact_test_dark.html"`);
try { fs.unlinkSync('contact_test_dark.html'); } catch(e) {}

execSync(`"${edgePath}" --headless --disable-gpu --window-size=768,1024 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/contact_final_tablet.png" "file:///c:/Users/DELL/Desktop/Food Feast/Contact.html"`);

execSync(`"${edgePath}" --headless --disable-gpu --window-size=414,896 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/contact_final_mobile.png" "file:///c:/Users/DELL/Desktop/Food Feast/Contact.html"`);

let rtlHtml = baseHtml.replace('<html lang="en">', '<html lang="en" dir="rtl">');
fs.writeFileSync('contact_test_rtl.html', rtlHtml, 'utf8');
execSync(`"${edgePath}" --headless --disable-gpu --window-size=1280,820 --screenshot="C:/Users/DELL/.gemini/antigravity-ide/brain/76cfb2f2-ef16-4281-8831-f2f33bfe9fc1/scratch/contact_final_rtl.png" "file:///c:/Users/DELL/Desktop/Food Feast/contact_test_rtl.html"`);
try { fs.unlinkSync('contact_test_rtl.html'); } catch(e) {}

console.log('All screenshots captured successfully!');

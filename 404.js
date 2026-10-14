/**
 * FOOD FEAST — 404 PAGE CONTROLLER (404.js)
 * Handles Theme Toggling, RTL Switching, Interactive Animations,
 * Web Audio Synthesized Horn Sound, and Keyboard Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initInteractiveParallax();
  initFoodTruckInteraction();
  initPortalCompassInteraction();
  initKeyboardNavigation();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* --------------------------------------------------------------------------
   1. THEME CONTROLLER (LIGHT / DARK)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('ff_theme') || localStorage.getItem('foodfeast_theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const isDark = currentTheme === 'dark' || currentTheme === 'charcoal';
      const nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    const isDark = theme === 'dark' || theme === 'charcoal';
    const canonicalTheme = isDark ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', canonicalTheme);
    localStorage.setItem('ff_theme', canonicalTheme);
    localStorage.setItem('foodfeast_theme', canonicalTheme);

    if (themeToggleBtn) {
      const iconType = isDark ? 'moon' : 'sun';
      themeToggleBtn.innerHTML = `<i data-lucide="${iconType}" id="themeLucideIcon" class="theme-lucide-icon"></i>`;
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }
}

/* --------------------------------------------------------------------------
   2. RTL (RIGHT-TO-LEFT) CONTROLLER
   -------------------------------------------------------------------------- */
function initRTL() {
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlText = document.getElementById('rtlText');
  const htmlRoot = document.documentElement;

  const savedDir = localStorage.getItem('ff_dir') || 'ltr';
  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(nextDir);
    });
  }

  function setDirection(dir) {
    htmlRoot.setAttribute('dir', dir);
    localStorage.setItem('ff_dir', dir);
    if (rtlText) {
      rtlText.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      rtlToggleBtn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)');
    }
  }
}

/* --------------------------------------------------------------------------
   3. 3D PERSPECTIVE MOUSE PARALLAX TILT
   -------------------------------------------------------------------------- */
function initInteractiveParallax() {
  const scene = document.getElementById('anim404Scene');
  if (!scene || window.matchMedia('(pointer: coarse)').matches) return;

  let bounds = scene.getBoundingClientRect();
  window.addEventListener('resize', () => {
    bounds = scene.getBoundingClientRect();
  });

  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    const deltaY = (e.clientY - centerY) / centerY;

    const tiltX = -deltaY * 12; // tilt max 12 deg
    const tiltY = deltaX * 16;  // tilt max 16 deg

    scene.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    scene.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* --------------------------------------------------------------------------
   4. FOOD TRUCK HONK & SOUND SYNTHESIS
   -------------------------------------------------------------------------- */
function initFoodTruckInteraction() {
  const foodTruck = document.getElementById('foodTruckUnit');
  const honkBubble = document.getElementById('honkBubble');
  let honkTimeout = null;

  if (!foodTruck) return;

  function triggerHonk() {
    playTruckHornSound();

    if (honkBubble) {
      honkBubble.classList.add('show');
      clearTimeout(honkTimeout);
      honkTimeout = setTimeout(() => {
        honkBubble.classList.remove('show');
      }, 1600);
    }

    // Dynamic truck jump
    foodTruck.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    foodTruck.style.transform = 'translateY(-16px) scale(1.08)';
    setTimeout(() => {
      foodTruck.style.transform = '';
      setTimeout(() => {
        foodTruck.style.transition = '';
      }, 200);
    }, 180);
  }

  foodTruck.addEventListener('click', triggerHonk);
  foodTruck.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerHonk();
    }
  });
}

/**
 * Synthesizes a friendly dual-tone truck horn using Web Audio API
 */
function playTruckHornSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    masterGain.connect(ctx.destination);

    // Two harmonious tones for realistic dual vehicle horn (F4 & A4 notes)
    [349.23, 440.00].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to soften the horn buzz into a warm brassy chime
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.connect(filter);
      filter.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  } catch (err) {
    // Graceful fallback if Web Audio is restricted
    console.debug('Web Audio horn skipped', err);
  }
}

/* --------------------------------------------------------------------------
   5. CENTER PORTAL RADAR DISH INTERACTION
   -------------------------------------------------------------------------- */
function initPortalCompassInteraction() {
  const portal = document.querySelector('.digit-center-portal');
  if (!portal) return;

  portal.addEventListener('click', () => {
    portal.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    portal.style.transform = 'scale(1.2) rotate(360deg)';

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (_) {}

    setTimeout(() => {
      portal.style.transform = '';
      setTimeout(() => {
        portal.style.transition = '';
      }, 400);
    }, 850);
  });
}

/* --------------------------------------------------------------------------
   6. KEYBOARD SHORTCUTS (H = HOME, ESC = PREVIOUS, T = THEME, R = RTL)
   -------------------------------------------------------------------------- */
function initKeyboardNavigation() {
  const backCta = document.getElementById('backCta');

  if (backCta) {
    backCta.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    // Avoid interfering if typing in an input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();

    if (key === 'h') {
      window.location.href = 'index.html';
    } else if (e.key === 'Escape') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    } else if (key === 't') {
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) themeBtn.click();
    } else if (key === 'r') {
      const rtlBtn = document.getElementById('rtlToggleBtn');
      if (rtlBtn) rtlBtn.click();
    }
  });
}

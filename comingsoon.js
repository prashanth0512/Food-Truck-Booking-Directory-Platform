/**
 * FOOD FEAST — COMING SOON CONTROLLER (comingsoon.js)
 * 40-Day Live Countdown, Theme & RTL Toggles, VIP Email Subscription,
 * Canvas Confetti Shower, and Web Audio Vehicle Horn.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  init40DayCountdown();
  initNotifyForm();
  initTruckHonk();
  initInteractiveParallax();
  initKeyboardShortcuts();

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
   3. 40-DAY COUNTDOWN TIMER (DAYS, HOURS, MINUTES, SECONDS)
   -------------------------------------------------------------------------- */
function init40DayCountdown() {
  const daysEl = document.getElementById('daysVal');
  const hoursEl = document.getElementById('hoursVal');
  const minsEl = document.getElementById('minsVal');
  const secsEl = document.getElementById('secsVal');

  const daysProgress = document.getElementById('daysProgress');
  const hoursProgress = document.getElementById('hoursProgress');
  const minsProgress = document.getElementById('minsProgress');
  const secsProgress = document.getElementById('secsProgress');

  const STORAGE_KEY = 'ff_comingsoon_target_v2';
  const FORTY_DAYS_MS = 40 * 24 * 60 * 60 * 1000;

  // Retrieve existing or initialize persistent 40-day target timestamp
  let targetTimestamp = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (!targetTimestamp || parseInt(targetTimestamp, 10) <= now) {
    targetTimestamp = now + FORTY_DAYS_MS;
    localStorage.setItem(STORAGE_KEY, targetTimestamp);
  } else {
    targetTimestamp = parseInt(targetTimestamp, 10);
  }

  function updateClock() {
    const current = Date.now();
    const remaining = Math.max(0, targetTimestamp - current);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    setDigitWithAnimation(daysEl, padZero(days));
    setDigitWithAnimation(hoursEl, padZero(hours));
    setDigitWithAnimation(minsEl, padZero(minutes));
    setDigitWithAnimation(secsEl, padZero(seconds));

    // Progress bar calculations
    if (daysProgress) daysProgress.style.width = `${Math.min(100, (days / 40) * 100)}%`;
    if (hoursProgress) hoursProgress.style.width = `${((24 - hours) / 24) * 100}%`;
    if (minsProgress) minsProgress.style.width = `${((60 - minutes) / 60) * 100}%`;
    if (secsProgress) secsProgress.style.width = `${((60 - seconds) / 60) * 100}%`;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : String(num);
  }

  function setDigitWithAnimation(el, newText) {
    if (!el) return;
    if (el.textContent !== newText) {
      el.textContent = newText;
      el.classList.add('pulse');
      setTimeout(() => el.classList.remove('pulse'), 180);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   4. VIP EMAIL SUBSCRIPTION & CONFETTI SHOWER
   -------------------------------------------------------------------------- */
function initNotifyForm() {
  const form = document.getElementById('notifyForm');
  const emailInput = document.getElementById('notifyEmail');
  const feedback = document.getElementById('subscriptionFeedback');
  const submitBtn = document.getElementById('notifySubmitBtn');

  // Pre-fill if already subscribed
  const existingSub = localStorage.getItem('ff_vip_subscriber');
  if (existingSub && emailInput) {
    emailInput.value = existingSub;
    if (feedback) {
      feedback.textContent = '✓ You are already on the VIP launch list!';
      feedback.className = 'subscription-feedback success';
    }
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      if (feedback) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'subscription-feedback error';
        emailInput.focus();
      }
      return;
    }

    // Save subscriber
    localStorage.setItem('ff_vip_subscriber', email);

    // Button loading animation
    if (submitBtn) {
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Reserving...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> VIP Confirmed!';
        
        if (feedback) {
          feedback.textContent = `🎉 You're in! We'll send early access passes to ${email}.`;
          feedback.className = 'subscription-feedback success';
        }

        playChimeCelebration();
        spawnConfettiShower();

        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
        }, 4000);
      }, 700);
    }
  });
}

/**
 * Spawns an animated confetti shower over the screen
 */
function spawnConfettiShower() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  const colors = ['#C94040', '#F2B544', '#E07A28', '#287447', '#FFFFFF', '#FF8175'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = `${Math.random() * 8 + 6}px`;
    piece.style.height = `${Math.random() * 12 + 6}px`;
    piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4000);
  }
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE FOOD TRUCK HONK & SOUND SYNTHESIS
   -------------------------------------------------------------------------- */
function initTruckHonk() {
  const truck = document.getElementById('truckChassis');
  const honkBubble = document.getElementById('honkBubble');
  let bubbleTimeout = null;

  if (!truck) return;

  function triggerHonk() {
    playTruckHornSound();

    if (honkBubble) {
      honkBubble.classList.add('show');
      clearTimeout(bubbleTimeout);
      bubbleTimeout = setTimeout(() => {
        honkBubble.classList.remove('show');
      }, 1600);
    }

    truck.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    truck.style.transform = 'translateY(-14px) scale(1.08)';
    setTimeout(() => {
      truck.style.transform = '';
      setTimeout(() => {
        truck.style.transition = '';
      }, 200);
    }, 180);
  }

  truck.addEventListener('click', triggerHonk);
  truck.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerHonk();
    }
  });
}

function playTruckHornSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    gain.connect(ctx.destination);

    [349.23, 440.00].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.connect(filter);
      filter.connect(gain);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  } catch (_) {}
}

function playChimeCelebration() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  } catch (_) {}
}

/* --------------------------------------------------------------------------
   6. 3D PERSPECTIVE MOUSE PARALLAX TILT
   -------------------------------------------------------------------------- */
function initInteractiveParallax() {
  const scene = document.getElementById('animComingScene');
  if (!scene || window.matchMedia('(pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    const deltaY = (e.clientY - centerY) / centerY;

    const tiltX = -deltaY * 10;
    const tiltY = deltaX * 14;

    scene.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    scene.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* --------------------------------------------------------------------------
   7. KEYBOARD SHORTCUTS
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    if (key === 'h') {
      window.location.href = 'index.html';
    } else if (key === 't') {
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) themeBtn.click();
    } else if (key === 'r') {
      const rtlBtn = document.getElementById('rtlToggleBtn');
      if (rtlBtn) rtlBtn.click();
    } else if (e.key === ' ' || e.key === 'Enter') {
      const truck = document.getElementById('truckChassis');
      if (truck) truck.click();
    }
  });
}

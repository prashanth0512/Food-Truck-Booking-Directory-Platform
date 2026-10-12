document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initPasswordToggle();
  initPasswordStrength();
  initSignupForm();
  initSocialSignups();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

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
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }
}

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
    }
  }
}

function initPasswordToggle() {
  const passwordInput = document.getElementById('signupPassword');
  const toggleBtn = document.getElementById('passwordToggleBtn');
  const toggleIcon = document.getElementById('passwordToggleIcon');

  if (!passwordInput || !toggleBtn || !toggleIcon) return;

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

    if (isPassword) {
      toggleIcon.classList.remove('fa-regular', 'fa-eye');
      toggleIcon.classList.add('fa-solid', 'fa-eye-slash');
      toggleBtn.setAttribute('aria-label', 'Hide password');
    } else {
      toggleIcon.classList.remove('fa-solid', 'fa-eye-slash');
      toggleIcon.classList.add('fa-regular', 'fa-eye');
      toggleBtn.setAttribute('aria-label', 'Show password');
    }
  });
}

function initPasswordStrength() {
  const passwordInput = document.getElementById('signupPassword');
  const fillBar = document.getElementById('strengthBarFill');
  const strengthText = document.getElementById('strengthText');

  if (!passwordInput || !fillBar || !strengthText) return;

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (!val) {
      fillBar.style.width = '0%';
      fillBar.className = 'strength-bar-fill';
      strengthText.innerHTML = 'Password Strength: <span>Weak</span>';
      return;
    }

    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    fillBar.className = 'strength-bar-fill';

    if (score <= 2) {
      fillBar.classList.add('weak');
      fillBar.style.width = '33%';
      strengthText.innerHTML = 'Password Strength: <span style="color: #ef4444; font-weight: 700;">Weak</span>';
    } else if (score <= 3) {
      fillBar.classList.add('medium');
      fillBar.style.width = '66%';
      strengthText.innerHTML = 'Password Strength: <span style="color: #eab308; font-weight: 700;">Medium</span>';
    } else {
      fillBar.classList.add('strong');
      fillBar.style.width = '100%';
      strengthText.innerHTML = 'Password Strength: <span style="color: #22c55e; font-weight: 700;">Strong & Secure</span>';
    }
  });
}

function initSignupForm() {
  const form = document.getElementById('signupForm');
  const nameInput = document.getElementById('signupFullName');
  const emailInput = document.getElementById('signupEmail');
  const phoneInput = document.getElementById('signupPhone');
  const passwordInput = document.getElementById('signupPassword');
  const termsCheckbox = document.getElementById('agreeTerms');
  const submitBtn = document.getElementById('signupSubmitBtn');

  if (!form) return;

  [nameInput, emailInput, phoneInput, passwordInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    }
  });

  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      const termsError = document.getElementById('termsError');
      if (termsError && termsCheckbox.checked) {
        termsError.style.display = 'none';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const passwordVal = passwordInput ? passwordInput.value : '';
    const termsVal = termsCheckbox ? termsCheckbox.checked : false;

    let isValid = true;

    if (!nameVal || nameVal.length < 2) {
      setError(nameInput, 'nameError', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      setError(emailInput, 'emailError', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    const phoneClean = phoneVal.replace(/[^0-9]/g, '');
    if (!phoneVal || phoneClean.length < 7) {
      setError(phoneInput, 'phoneError', 'Please enter a valid phone number (at least 7 digits).');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    if (!passwordVal || passwordVal.length < 6) {
      setError(passwordInput, 'passwordError', 'Password must be at least 6 characters long.');
      isValid = false;
    } else {
      clearError(passwordInput);
    }

    const termsError = document.getElementById('termsError');
    if (!termsVal) {
      if (termsError) {
        termsError.style.display = 'block';
        termsError.textContent = 'You must agree to the Terms of Service & Privacy Policy.';
      }
      isValid = false;
    } else {
      if (termsError) termsError.style.display = 'none';
    }

    if (!isValid) return;

    setButtonLoading(submitBtn, true);

    setTimeout(() => {
      
      const newUser = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        role: 'Foodie Enthusiast',
        avatar: 'assets/chef_marcus.jpg',
        joinedAt: new Date().toISOString(),
        isNewMember: true
      };

      localStorage.setItem('foodfeast_user', JSON.stringify(newUser));
      localStorage.setItem('foodfeast_is_authenticated', 'true');
      localStorage.setItem('ff_remembered_user', emailVal);

      setButtonLoading(submitBtn, false);
      showToast(`🎉 Account created for ${nameVal}! Welcome to Food Feast.`, 'fa-circle-check');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1100);

    }, 900);
  });

  function setError(inputEl, errorId, message) {
    if (!inputEl) return;
    const group = inputEl.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (errorEl && message) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    inputEl.focus();
  }

  function clearError(inputEl) {
    if (!inputEl) return;
    const group = inputEl.closest('.form-group');
    if (group) group.classList.remove('has-error');
  }

  function setButtonLoading(btn, isLoading) {
    if (!btn) return;
    const btnText = btn.querySelector('.btn-text');
    const btnIcon = btn.querySelector('.btn-icon');

    if (isLoading) {
      btn.classList.add('loading');
      if (btnText) btnText.textContent = 'Creating account...';
      if (btnIcon) {
        btnIcon.className = 'fa-solid fa-spinner fa-spin btn-icon';
      }
    } else {
      btn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Create Account';
      if (btnIcon) {
        btnIcon.className = 'fa-solid fa-arrow-right btn-icon';
      }
    }
  }
}

function initSocialSignups() {
  const googleBtn = document.getElementById('googleSignupBtn');
  const appleBtn = document.getElementById('appleSignupBtn');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Connecting to Google Identity Services...', 'fa-brands fa-google');
      simulateSocialAuth('Google');
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showToast('Connecting to Apple ID Portal...', 'fa-brands fa-apple');
      simulateSocialAuth('Apple');
    });
  }

  function simulateSocialAuth(provider) {
    setTimeout(() => {
      const userSession = {
        name: `${provider} Foodie`,
        email: `member@${provider.toLowerCase()}.com`,
        role: 'Verified Member',
        provider: provider,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('foodfeast_user', JSON.stringify(userSession));
      localStorage.setItem('foodfeast_is_authenticated', 'true');
      showToast(`Welcome! Successfully registered with ${provider}. Redirecting...`, 'fa-circle-check');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    }, 1000);
  }
}

function showToast(message, icon = 'fa-circle-info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initPasswordToggle();
  initLoginForm();
  initSocialLogins();
  initForgotPasswordModal();
  loadRememberedUser();

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
      const iconType = isDark ? 'sun' : 'moon';
      themeToggleBtn.innerHTML = `<i data-lucide="${iconType}" id="themeLucideIcon" class="theme-lucide-icon"></i>`;
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
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
  const passwordInput = document.getElementById('loginPassword');
  const toggleBtn = document.getElementById('passwordToggleBtn');
  const toggleIcon = document.getElementById('passwordToggleIcon');

  if (!passwordInput || !toggleBtn || !toggleIcon) return;

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    if (isPassword) {
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
      toggleBtn.setAttribute('aria-label', 'Hide password');
    } else {
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
      toggleBtn.setAttribute('aria-label', 'Show password');
    }
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  const identifierInput = document.getElementById('loginIdentifier');
  const passwordInput = document.getElementById('loginPassword');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (!form) return;

  [identifierInput, passwordInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const identifierVal = identifierInput.value.trim();
    const passwordVal = passwordInput.value;

    let isValid = true;

    if (!identifierVal) {
      setError(identifierInput, 'identifierError', 'Please enter your email or username');
      isValid = false;
    } else {
      clearError(identifierInput);
    }

    if (!passwordVal) {
      setError(passwordInput, 'passwordError', 'Please enter your password');
      isValid = false;
    } else if (passwordVal.length < 6) {
      setError(passwordInput, 'passwordError', 'Password must be at least 6 characters');
      isValid = false;
    } else {
      clearError(passwordInput);
    }

    if (!isValid) return;

    setButtonLoading(submitBtn, true);

    setTimeout(() => {
      
      if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('ff_remembered_user', identifierVal);
      } else {
        localStorage.removeItem('ff_remembered_user');
      }

      const userSession = {
        name: identifierVal.includes('@') ? identifierVal.split('@')[0] : identifierVal,
        email: identifierVal.includes('@') ? identifierVal : `${identifierVal}@foodfeast.com`,
        role: 'Foodie Enthusiast',
        avatar: 'assets/chef_marcus.jpg',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('foodfeast_user', JSON.stringify(userSession));
      localStorage.setItem('foodfeast_is_authenticated', 'true');

      setButtonLoading(submitBtn, false);
      showToast('🎉 Sign in successful! Redirecting to Dashboard...', 'fa-circle-check');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);

    }, 900);
  });

  function setError(inputEl, errorId, message) {
    const group = inputEl.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (errorEl && message) errorEl.textContent = message;
    inputEl.focus();
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) group.classList.remove('has-error');
  }

  function setButtonLoading(btn, isLoading) {
    if (!btn) return;
    const btnText = btn.querySelector('.btn-text');
    const btnIcon = btn.querySelector('.btn-icon');

    if (isLoading) {
      btn.classList.add('loading');
      if (btnText) btnText.textContent = 'Signing in...';
      if (btnIcon) {
        btnIcon.className = 'fa-solid fa-spinner btn-icon';
      }
    } else {
      btn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Sign In';
      if (btnIcon) {
        btnIcon.className = 'fa-solid fa-arrow-right btn-icon';
      }
    }
  }
}

function loadRememberedUser() {
  const remembered = localStorage.getItem('ff_remembered_user');
  const identifierInput = document.getElementById('loginIdentifier');
  const rememberMeCheckbox = document.getElementById('rememberMe');

  if (remembered && identifierInput) {
    identifierInput.value = remembered;
    if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
  }
}

function initSocialLogins() {
  const googleBtn = document.getElementById('googleLoginBtn');
  const appleBtn = document.getElementById('appleLoginBtn');

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
        email: `user@${provider.toLowerCase()}.com`,
        role: 'Verified Member',
        provider: provider,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('foodfeast_user', JSON.stringify(userSession));
      localStorage.setItem('foodfeast_is_authenticated', 'true');
      showToast(`Signed in successfully with ${provider}! Redirecting...`, 'fa-circle-check');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    }, 1000);
  }
}

function initForgotPasswordModal() {
  const forgotBtn = document.getElementById('forgotPasswordBtn');
  const modalBackdrop = document.getElementById('forgotModalBackdrop');
  const closeBtn = document.getElementById('closeForgotModalBtn');
  const forgotForm = document.getElementById('forgotForm');
  const emailInput = document.getElementById('forgotEmailInput');

  if (!forgotBtn || !modalBackdrop) return;

  forgotBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalBackdrop.classList.add('open');
    if (emailInput) {
      emailInput.value = '';
      setTimeout(() => emailInput.focus(), 150);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'fa-triangle-exclamation');
        return;
      }

      const sendBtn = document.getElementById('sendResetBtn');
      if (sendBtn) {
        sendBtn.innerHTML = '<span>Sending link...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      setTimeout(() => {
        closeModal();
        if (sendBtn) {
          sendBtn.innerHTML = '<span>Send Reset Link</span> <i class="fa-solid fa-paper-plane"></i>';
        }
        showToast(`Secure password reset link sent to ${email}!`, 'fa-envelope-circle-check');
      }, 1000);
    });
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
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

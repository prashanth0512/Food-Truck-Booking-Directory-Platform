document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initNavigation();
  initScrollAnimations();
  initScrollTop();
  initModals();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('ff_theme') || localStorage.getItem('foodfeast_theme') || 'light';
  const initialTheme = (savedTheme === 'charcoal' || savedTheme === 'dark') ? 'dark' : 'light';
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    const canonicalTheme = (theme === 'charcoal' || theme === 'dark') ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', canonicalTheme);
    localStorage.setItem('ff_theme', canonicalTheme);
    localStorage.setItem('foodfeast_theme', canonicalTheme);
    
    if (themeToggleBtn) {
      const iconType = canonicalTheme === 'light' ? 'moon' : 'sun';
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

function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const updateHeaderScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();
}

function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (drawerCloseBtn && mobileDrawer) {
    drawerCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-reveal-up, .animate-reveal-left, .animate-reveal-right, .animate-reveal-scale'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    
    animatedElements.forEach(el => el.classList.add('animate-visible'));
  }
}

let currentInquiryType = 'catering';

function setInquiryType(type) {
  currentInquiryType = type;

  document.querySelectorAll('.inquiry-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === type);
  });

  const dynamicFields = document.getElementById('dynamicEventFields');
  const submitBtn = document.getElementById('formSubmitBtn');
  const msgTextarea = document.getElementById('contactMessage');

  if (type === 'catering') {
    if (dynamicFields) dynamicFields.style.display = 'block';
    if (submitBtn) submitBtn.innerHTML = `<span>Send Event Inquiry</span> <i class="fa-solid fa-paper-plane"></i>`;
    if (msgTextarea) msgTextarea.placeholder = "Tell us about dietary needs (Halal, Vegan, Gluten-Free), timeline windows, power availability, or preferred cuisines (BBQ, Tacos, Burgers, Pizza)...";
  } else if (type === 'vendor') {
    if (dynamicFields) dynamicFields.style.display = 'none';
    if (submitBtn) submitBtn.innerHTML = `<span>Submit Vendor Application</span> <i class="fa-solid fa-truck-ramp-box"></i>`;
    if (msgTextarea) msgTextarea.placeholder = "Tell us your truck name, signature cuisines, city of operation, commissary depot, and health department inspection score...";
  } else if (type === 'location') {
    if (dynamicFields) dynamicFields.style.display = 'none';
    if (submitBtn) submitBtn.innerHTML = `<span>Suggest Location Spot</span> <i class="fa-solid fa-map-pin"></i>`;
    if (msgTextarea) msgTextarea.placeholder = "Describe the parking lot, brewery taproom, corporate park, or outdoor venue with address and available lunch/dinner hours...";
  } else {
    if (dynamicFields) dynamicFields.style.display = 'none';
    if (submitBtn) submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
    if (msgTextarea) msgTextarea.placeholder = "How can our concierge team assist you today?";
  }

  showToast(`Inquiry mode: ${type.toUpperCase()}`, 'fa-sliders');
}

function selectGuestSize(size) {
  document.querySelectorAll('.guest-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-size') === size);
  });

  const labels = {
    '20-75': '20 – 75 Guests (1 Truck)',
    '75-200': '75 – 200 Guests (1–2 Trucks)',
    '200-500': '200 – 500 Guests (2–3 Trucks)',
    '500-1500': '500 – 1,500 Guests (3–5 Trucks)',
    '1500+': '1,500+ Guests (Festival Pavilion)'
  };

  const labelEl = document.getElementById('selectedGuestCountLabel');
  if (labelEl && labels[size]) {
    labelEl.textContent = labels[size];
  }
}

function updateCharCount(textarea) {
  const counter = document.getElementById('charCounter');
  if (counter) {
    const len = textarea.value.length;
    counter.textContent = `${len} / 600`;
    counter.style.color = len > 550 ? 'var(--accent-yellow)' : 'var(--text-dim)';
  }
}

function triggerFileInput() {
  const fileInput = document.getElementById('fileAttachment');
  if (fileInput) fileInput.click();
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  const primaryText = document.getElementById('dropzonePrimaryText');
  const fileNameText = document.getElementById('dropzoneFileName');

  if (file) {
    if (primaryText) primaryText.innerHTML = `File attached: <strong>${file.name}</strong>`;
    if (fileNameText) fileNameText.textContent = `Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload`;
    showToast(`Attached: ${file.name}`, 'fa-file-circle-check');
  }
}

function handleContactFormSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('formSubmitBtn');
  const name = document.getElementById('contactFullName')?.value || 'Valued Guest';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Assigning Concierge...</span>`;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Inquiry Dispatched!</span>`;
    }

    showToast(`Thank you, ${name}! Your inquiry has been routed to our live dispatch desk.`, 'fa-circle-check');

    setTimeout(() => {
      document.getElementById('contactInquiryForm')?.reset();
      const counter = document.getElementById('charCounter');
      if (counter) counter.textContent = '0 / 600';
      
      const primaryText = document.getElementById('dropzonePrimaryText');
      const fileNameText = document.getElementById('dropzoneFileName');
      if (primaryText) primaryText.innerHTML = `Drag & drop your files here or <strong>Browse</strong>`;
      if (fileNameText) fileNameText.textContent = `Site plans, power specs, or event timelines`;
      
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Send Inquiry to Concierge</span> <i class="fa-solid fa-paper-plane"></i>`;
      }
    }, 2500);

  }, 1200);
}

const hubsData = {
  austin: {
    badge: 'NATIONAL HEADQUARTERS & TASTING ROOM',
    title: 'Austin Flagship Operations',
    address: '412 Congress Ave, Suite 900, Austin, TX 78701',
    fleet: '142',
    radius: '45 Mile',
    phone: '(512) 883-FEAST'
  },
  la: {
    badge: 'WEST COAST FLEET DEPOT & COMMISSARY',
    title: 'Los Angeles Arts District Hub',
    address: '780 Santa Fe Ave, Los Angeles, CA 90021',
    fleet: '168',
    radius: '60 Mile',
    phone: '(213) 440-FOOD'
  },
  nyc: {
    badge: 'TRI-STATE DISPATCH TERMINAL',
    title: 'New York Navy Yard Terminal',
    address: '63 Flushing Ave, Building 77, Brooklyn, NY 11205',
    fleet: '115',
    radius: '35 Mile',
    phone: '(212) 991-FEAST'
  },
  chicago: {
    badge: 'MIDWEST TEST KITCHEN & LOGISTICS',
    title: 'Chicago Fulton Market Base',
    address: '920 W Fulton Market, Chicago, IL 60607',
    fleet: '95',
    radius: '40 Mile',
    phone: '(312) 550-FOOD'
  }
};

function switchHub(hubKey) {
  const data = hubsData[hubKey];
  if (!data) return;

  document.querySelectorAll('.hub-select-card').forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-hub') === hubKey);
  });

  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.classList.toggle('active', pin.id.toLowerCase().includes(hubKey));
  });

  const infoCard = document.getElementById('mapInfoCard');
  if (infoCard) {
    infoCard.style.opacity = '0.7';
    infoCard.style.transform = 'translateY(5px)';

    setTimeout(() => {
      document.getElementById('mapHubBadge').textContent = data.badge;
      document.getElementById('mapHubTitle').textContent = data.title;
      document.getElementById('mapHubAddress').textContent = data.address;
      document.getElementById('mapHubFleet').textContent = data.fleet;
      document.getElementById('mapHubRadius').textContent = data.radius;

      infoCard.style.opacity = '1';
      infoCard.style.transform = 'translateY(0)';
    }, 150);
  }

  showToast(`Active Hub: ${data.title}`, 'fa-map-pin');
}

function toggleFaq(triggerBtn) {
  const item = triggerBtn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    if (openItem !== item) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      openItem.querySelector('.faq-answer').style.maxHeight = null;
    }
  });

  if (isOpen) {
    item.classList.remove('open');
    triggerBtn.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = null;
  } else {
    item.classList.add('open');
    triggerBtn.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
  }
}

function filterFaqs(category) {
  
  document.querySelectorAll('.faq-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === category);
  });

  const searchInput = document.getElementById('faqSearchInput');
  if (searchInput) searchInput.value = '';

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
      item.classList.remove('open');
      item.querySelector('.faq-answer').style.maxHeight = null;
    }
  });
}

function handleFaqSearch(keyword) {
  const cleanKeyword = keyword.toLowerCase().trim();
  const faqItems = document.querySelectorAll('.faq-item');

  if (cleanKeyword.length > 0) {
    document.querySelectorAll('.faq-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
    });
  }

  faqItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (cleanKeyword === '' || text.includes(cleanKeyword)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
      item.classList.remove('open');
      item.querySelector('.faq-answer').style.maxHeight = null;
    }
  });
}

function initModals() {
  const loginBtn = document.getElementById('loginBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

function openLoginModal() {
  window.location.href = 'login.html';
}

function closeLoginModal() {}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('input');
  if (input && input.value) {
    showToast(`Subscribed ${input.value} to Street Food Alerts!`, 'fa-paper-plane');
    input.value = '';
  }
}

function showToast(message, iconClass = 'fa-circle-info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initNavigation();
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
  const normalizedTheme = (savedTheme === 'charcoal' || savedTheme === 'dark') ? 'dark' : 'light';
  setTheme(normalizedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = (currentTheme === 'dark' || currentTheme === 'charcoal') ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    const isDark = (theme === 'dark' || theme === 'charcoal');
    const targetTheme = isDark ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', targetTheme);
    localStorage.setItem('ff_theme', targetTheme);
    localStorage.setItem('foodfeast_theme', targetTheme);
    
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

const occasionsData = {
  private: {
    badge: 'POPULAR FOR PRIVATE GATHERINGS',
    img: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1000&q=80',
    capacity: '20 – 150 Guests',
    turnaround: '30s Plate Speed',
    title: 'Private Parties & Celebrations',
    desc: 'Transform backyard birthdays, graduation parties, family reunions, and anniversaries with interactive mobile culinary stations. Guests order hot customized meals directly from the truck window.',
    perks: [
      'Tailored minimum spend packages',
      'Kid-friendly & allergen-safe menus',
      'Fast 30-second window turnaround'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  },
  corporate: {
    badge: 'POPULAR FOR CORPORATE',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    capacity: '50 – 2,500+ Guests',
    turnaround: '45s Plate Speed',
    title: 'Corporate Events & Office Catering',
    desc: 'Boost company morale, impress VIP clients, or celebrate product launches with multi-truck catering lines. We handle power hookups, synchronized lunch windows, and custom dietary accommodations seamlessly.',
    perks: [
      'Direct invoice billing & W9 compliance',
      'Turnkey waste & generator management',
      'Synchronized multi-truck fleets'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  },
  weddings: {
    badge: 'PREMIUM FOR WEDDINGS & FESTIVALS',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    capacity: '100 – 5,000+ Guests',
    turnaround: '40s Plate Speed',
    title: 'Weddings, Festivals & Special Gatherings',
    desc: 'From late-night wedding comfort food trucks (gourmet tacos, sliders, churros) to high-volume 5,000-guest festival food courts. We deliver showstopping aesthetic presentation and rapid line pacing.',
    perks: [
      'Bespoke midnight snack menus',
      'Aesthetic illuminated truck setups',
      'Full venue permit & insurance clearance'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  },
  community: {
    badge: 'COMMUNITY & NEIGHBORHOOD HERO',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    capacity: '40 – 500 Guests',
    turnaround: '35s Plate Speed',
    title: 'Community & Neighborhood Pop-Ups',
    desc: 'Bring local communities together with family-friendly food truck rallies, school sports concessions, HOA pool days, and neighborhood movie nights. Fast multi-window service with kid-approved menus.',
    perks: [
      'Zero upfront organizer cost options',
      'Fundraising revenue share packages',
      'Neighborhood permit & parking handling'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  },
  nightlife: {
    badge: 'CRAFT BREWERY & NIGHTLIFE',
    img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    capacity: '30 – 350 Guests',
    turnaround: '25s Plate Speed',
    title: 'Brewery & Nightlife Residencies',
    desc: 'Partner with taprooms, cocktail bars, and craft distilleries lacking an in-house kitchen. Rotating gourmet mobile chefs serve craveable gastropub bites, street tacos, smash burgers, and loaded fries directly to your patrons.',
    perks: [
      'Scheduled recurring weekly residencies',
      'Custom beer pairing & pub grub menus',
      'Zero kitchen overhead for venue owners'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  },
  filmset: {
    badge: 'ON-LOCATION PRODUCTION CATERING',
    img: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&w=1000&q=80',
    capacity: '25 – 800+ Crew',
    turnaround: '20s Grab & Go Speed',
    title: 'Film Sets & Job-Site Concessions',
    desc: 'High-energy, prompt craft meals delivered directly to remote film sets, commercial shoots, infrastructure job sites, and emergency relief bases. Hot meals ready precisely when call times and work shifts require.',
    perks: [
      'Flexible call-time & wrap scheduling',
      'Individual hot boxed meal options',
      'Self-contained water & generator power'
    ],
    ctaDestination: 'Services Details.html?service=event-booking'
  }
};

function switchOccasion(occasionKey) {
  const data = occasionsData[occasionKey];
  if (!data) return;

  document.querySelectorAll('.occasion-select-card').forEach(card => {
    if (card.getAttribute('data-occasion') === occasionKey) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const stage = document.getElementById('occasionFeatureStage');
  if (stage) {
    stage.style.opacity = '0.7';
    stage.style.transform = 'scale(0.99)';

    setTimeout(() => {
      document.getElementById('occasionBadge').textContent = data.badge;
      document.getElementById('occasionFeaturedImg').src = data.img;
      document.getElementById('occasionCapacity').innerHTML = `<i class="fa-solid fa-users"></i> ${data.capacity}`;
      document.getElementById('occasionTurnaround').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${data.turnaround}`;
      document.getElementById('occasionTitle').textContent = data.title;
      document.getElementById('occasionDesc').textContent = data.desc;
      
      const perksContainer = document.getElementById('occasionPerks');
      perksContainer.innerHTML = data.perks.map(p => `<div class="perk-tag"><i class="fa-solid fa-check"></i> ${p}</div>`).join('');
      
      document.getElementById('occasionCtaBtn').href = data.ctaDestination;

      stage.style.opacity = '1';
      stage.style.transform = 'scale(1)';
    }, 180);
  }

  showToast(`Viewing: ${data.title}`, 'fa-calendar-check');
}

const cuisinesData = {
  burgers: {
    eyebrow: 'HIGH-HEAT MAILLARD CRAFT',
    title: 'Gourmet Smash Burgers & Brioche',
    desc: 'Dry-aged Angus patties smashed paper-thin on 550°F cast iron planchas to create crispy lace edges while sealing 100% of rich juices. Topped with house-made smoked bacon marmalade and black truffle aioli.',
    dishName: 'Double Truffle Angus Smash',
    truckCount: '84 Trucks Mapped',
    tags: ['Dry-Aged Angus', 'Butter Toasted Brioche', 'Smoked Truffle Aioli', 'Halal Certified Options'],
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    pillText: '550° Plancha Crisp'
  },
  tacos: {
    eyebrow: 'HERITAGE OAXACAN RECIPES',
    title: 'Crispy Birria & Hand-Pressed Masa Tacos',
    desc: 'Heritage stone-ground corn tortillas crisped on beef tallow planchas, stuffed with 8-hour braised chuck roast and melted Oaxaca quesillo. Served with rich aromatic consommé dip.',
    dishName: 'Quesabirria Supreme Trio with Consommé',
    truckCount: '92 Trucks Mapped',
    tags: ['Stone-Ground Masa', '8-Hour Consommé', 'Oaxaca Quesillo', 'Guajillo Chili Rub'],
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',
    pillText: 'Ancestral Nixtamal'
  },
  pizza: {
    eyebrow: 'VOLCANIC STONE DOME HEAT',
    title: '900° Wood-Fired Neapolitan Pizza',
    desc: 'Crafted with 48-hour cold-fermented wild sourdough levain and baked in mobile volcanic-stone ovens in 90 seconds. Topped with crushed San Marzano tomatoes, fresh buffalo mozzarella, and sweet basil.',
    dishName: 'San Marzano Margherita D.O.P.',
    truckCount: '65 Trucks Mapped',
    tags: ['48-Hr Fermentation', 'San Marzano D.O.P.', 'Buffalo Mozzarella', 'Mobile Wood Oven'],
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    pillText: '90-Second Blister'
  },
  asian: {
    eyebrow: 'BREATH OF THE WOK (WOK HEI)',
    title: 'High-Heat Wok Bao & Street Noodles',
    desc: 'Fiery high-BTU wok tossed noodles infused with smokey wok hei aroma, paired with pillowy steamed lotus leaf bao buns stuffed with 5-spice braised pork belly and crushed peanuts.',
    dishName: 'Braised Pork Belly Gua Bao Duo',
    truckCount: '78 Trucks Mapped',
    tags: ['Aerosol Wok Hei', 'Steamed Gua Bao', 'Sichuan Chili Crisp', '5-Spice Braise'],
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
    pillText: 'Smoky Wok Hei'
  },
  desserts: {
    eyebrow: 'ARTISANAL EUROPEAN CONFECTION',
    title: 'Belgian Pearl Sugar Waffles & Gelato',
    desc: 'Authentic Liège brioche dough folded with imported Belgian pearl sugar that caramelizes into crispy golden pockets in cast iron irons. Topped with dense Madagascar vanilla bean gelato.',
    dishName: 'Liège Caramel Waffle with Gelato',
    truckCount: '46 Trucks Mapped',
    tags: ['Belgian Pearl Sugar', 'Brioche Yeast Dough', 'Madagascar Gelato', 'Berry Compote'],
    img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80',
    pillText: 'Caramelized Crunch'
  }
};

function switchCuisine(cuisineKey) {
  const data = cuisinesData[cuisineKey];
  if (!data) return;

  document.querySelectorAll('.cuisine-pill-btn').forEach(btn => {
    if (btn.getAttribute('data-cuisine') === cuisineKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.cuisine-mini-card').forEach(card => {
    if (card.getAttribute('data-cuisine-card') === cuisineKey) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const board = document.getElementById('cuisineBoard');
  if (board) {
    board.style.opacity = '0.7';
    board.style.transform = 'scale(0.99)';

    setTimeout(() => {
      document.getElementById('cuisineEyebrow').textContent = data.eyebrow;
      document.getElementById('cuisineTitle').textContent = data.title;
      document.getElementById('cuisineDesc').textContent = data.desc;
      document.getElementById('cuisineDishName').textContent = data.dishName;
      document.getElementById('cuisineTruckCount').textContent = data.truckCount;
      document.getElementById('cuisineImg').src = data.img;
      document.getElementById('cuisinePill').innerHTML = `<i class="fa-solid fa-fire"></i> <span>${data.pillText}</span>`;
      
      const tagsContainer = document.getElementById('cuisineTags');
      tagsContainer.innerHTML = data.tags.map(t => `<span class="cuisine-tag-chip">${t}</span>`).join('');

      board.style.opacity = '1';
      board.style.transform = 'scale(1)';
    }, 160);
  }

  showToast(`Cuisine: ${data.title.split('&')[0].trim()}`, 'fa-utensils');
}

function initModals() {
  const inquiryModal = document.getElementById('inquiryModal');
  const loginBtn = document.getElementById('loginBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        closeInquiryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInquiryModal();
    }
  });
}

function openLoginModal() {
  window.location.href = 'login.html';
}

function closeLoginModal() {}

function openQuickInquiryModal(occasionName) {
  const modal = document.getElementById('inquiryModal');
  if (modal) {
    if (occasionName) {
      const occasionSelect = document.getElementById('inquiryOccasion');
      if (occasionSelect) {
        if (occasionName.toLowerCase().includes('corporate')) occasionSelect.value = 'corporate';
        else if (occasionName.toLowerCase().includes('private')) occasionSelect.value = 'private';
        else if (occasionName.toLowerCase().includes('wedding')) occasionSelect.value = 'wedding';
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleInquirySubmit(e) {
  e.preventDefault();
  closeInquiryModal();
  showToast('Catering inquiry submitted! An event concierge will contact you within 24h.', 'fa-paper-plane');
}

function openVendorSignupModal() {
  window.location.href = 'signup.html';
}

function openVendorPortalModal() {
  window.location.href = 'login.html';
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input) input.value = '';
  showToast('Subscribed to weekly gourmet pop-up alerts!', 'fa-envelope-circle-check');
}

function showToast(message, iconClass = 'fa-info-circle') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
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

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initNavigation();
  initScrollAnimations();
  initModals();
  initScrollTop();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const rawTheme = localStorage.getItem('ff_theme') || localStorage.getItem('foodfeast_theme') || 'light';
  const canonicalTheme = (rawTheme === 'dark' || rawTheme === 'charcoal') ? 'dark' : 'light';
  setTheme(canonicalTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const isDark = currentTheme === 'dark' || currentTheme === 'charcoal';
      const nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('ff_theme', theme);
    localStorage.setItem('foodfeast_theme', theme);

    if (themeToggleBtn) {
      const iconType = theme === 'dark' ? 'moon' : 'sun';
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
  const animatedSections = document.querySelectorAll(
    '.about-mission-section, .about-vision-section, .about-heritage-section, .about-timeline-section, .about-chefs-section, .about-standards-section'
  );
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    animatedSections.forEach(section => observer.observe(section));
  } else {
    animatedSections.forEach(section => section.classList.add('in-view'));
  }
}

const chefsData = {
  marcus: {
    name: 'Chef Marcus Sterling',
    category: 'TEXAS OAK BBQ',
    truck: 'The Lone Star Pitmaster',
    rating: '4.95 (1,240 reviews)',
    badge: 'Master Pitmaster & Co-Founder',
    roleLine: 'Executive Pitmaster • Hardwood Smoke Craft',
    portraitImg: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Grand Smoked Wagyu Ribs Platter',
    bio: 'Generational Texas pitmaster dedicated to 16-hour hickory wood smoking. Marcus sources heritage Berkshire pork and Angus beef, dry-rubbed with his family\'s secret 14-spice blend.',
    pedagogyTitle: 'Thermal Equilibrium & Oak Combustion Science',
    pedagogyLead: 'Marcus instructs apprentices on convective heat currents inside offset smokers, internal meat core moisture retention at 203°F, and maintaining pure blue oak smoke.',
    pedagogyModules: [
      { num: '01', title: 'Wood Chemistry & Density', desc: 'Post oak vs. green hickory combustion, moisture levels, and ring depth.' },
      { num: '02', title: '16-Hour Collagen Gelatinization', desc: 'Managing the brisket stall curve between 150°F and 175°F.' },
      { num: '03', title: 'High-Velocity Street Plating', desc: 'Carving station ergonomics to serve 120 guests per hour seamlessly.' }
    ]
  },
  isabella: {
    name: 'Chef Isabella Ramos',
    category: 'OAXACAN BIRRIA',
    truck: 'El Fuego Birria Bus',
    rating: '4.92 (980 reviews)',
    badge: 'Executive Birria Alchemist',
    roleLine: 'Executive Birria Alchemist • Heritage Oaxacan Craft',
    portraitImg: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Quesabirria Street Tacos Supreme',
    bio: 'Trained in Oaxaca, Isabella crafts handmade stone-ground corn tortillas crisped in rich beef tallow with slow-braised brisket consommé dip.',
    pedagogyTitle: 'Ancestral Nixtamalization & Dried Chili Terroir',
    pedagogyLead: 'Isabella mentors rising chefs on selecting heirloom Mexican corn varieties, alkaline cal water ratios for masa elasticity, and unlocking deep umami from toasted chilis.',
    pedagogyModules: [
      { num: '01', title: 'Volcanic Metate Milling', desc: 'Cal-cooked heirloom corn grinding and hydration dynamics.' },
      { num: '02', title: '8-Hour Consommé Infusion', desc: 'Balancing dried Ancho, Guajillo, and Pasilla chili profiles.' },
      { num: '03', title: 'Tallow Crisp Griddle Mastery', desc: 'Double-dip plancha searing for maximum taco crisp and cheese stretch.' }
    ]
  },
  antoine: {
    name: 'Chef Antoine Moreau',
    category: 'GOURMET SMASH',
    truck: 'Sizzle & Bun Mobile',
    rating: '4.88 (850 reviews)',
    badge: 'Dry-Aged Angus Virtuoso',
    roleLine: 'Dry-Aged Angus Virtuoso • Gourmet Smash Craft',
    portraitImg: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Double Truffle Smash Burger',
    bio: 'Former Parisian bistro chef bringing custom dry-aged beef blends, smoked bacon onion marmalade, and house truffle aioli to street burgers.',
    pedagogyTitle: 'Maillard Contact Mechanics & Fat-to-Lean Ratios',
    pedagogyLead: 'Antoine demonstrates how to achieve paper-thin crispy burger lace edges while locking 100% of beef juices inside the patty center through direct stainless-steel pressure.',
    pedagogyModules: [
      { num: '01', title: 'Custom Meat Blending Physics', desc: '80/20 Chuck-Brisket-Short Rib grind size and cold-press fat dispersion.' },
      { num: '02', title: '550°F Plancha Thermodynamics', desc: 'Instant crust sear and caramelizing house onion marmalade.' },
      { num: '03', title: 'Stable Aioli Emulsions', desc: 'Cold egg yolk and black truffle oil emulsification without separation.' }
    ]
  },
  giovanni: {
    name: 'Chef Giovanni Rossi',
    category: '900° WOOD OVEN',
    truck: 'Rolling Crust Oven',
    rating: '4.98 (1,120 reviews)',
    badge: 'Master Neapolitan Pizzaiolo',
    roleLine: 'Master Pizzaiolo • 900° Stone Oven Fermentation',
    portraitImg: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Neapolitan San Marzano Margherita',
    bio: 'Naples-certified master who installed a custom volcanic-stone oven inside a mobile truck for 90-second blistered sourdough crusts.',
    pedagogyTitle: 'Hydration Dynamics & Radiative Heat Baking',
    pedagogyLead: 'Giovanni\'s masterclass focuses on 70% hydration dough kneading, wild levain pH testing, and manipulating dome flame temperature for rapid blistering without drying the crumb.',
    pedagogyModules: [
      { num: '01', title: '48-Hour Cold Fermentation', desc: 'Micro-yeast culture activity and gluten matrix strength.' },
      { num: '02', title: '900°F Mobile Peel Ergonomics', desc: 'Frictionless dough launch and rapid turning inside stone ovens.' },
      { num: '03', title: 'D.O.P. Ingredient Harmony', desc: 'San Marzano raw crush and fresh buffalo mozzarella moisture draining.' }
    ]
  },
  kenji: {
    name: 'Chef Kenji Takahashi',
    category: 'ASIAN STREET WOK',
    truck: 'Dragon Wok & Bao',
    rating: '4.89 (730 reviews)',
    badge: 'Master Wok & Dim Sum Specialist',
    roleLine: 'Master Wok Specialist • High-Heat Wok Hei & Bao',
    portraitImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Steamed Pork Belly Gua Bao Duo',
    bio: 'Expert in high-heat wok hei searing, fluffy steamed lotus leaf buns, and 5-spice slow-braised pork belly glazed with sweet chili hoisin.',
    pedagogyTitle: 'Aerosolized Oil Ignition & Aerated Steam Proofing',
    pedagogyLead: 'Kenji mentors apprentices on high-BTU cast iron seasoning, toss angles that ignite vaporized cooking oil droplets for smoky wok hei aroma, and steam-proofing pillowy buns.',
    pedagogyModules: [
      { num: '01', title: 'Wok Hei Arc Mechanics', desc: 'Wrist flick arcs to aerate and combust microscopic oil droplets.' },
      { num: '02', title: 'Flash Aromatics Activation', desc: 'Timing garlic, scallion, and Sichuan peppercorns under extreme heat.' },
      { num: '03', title: 'Bamboo Steam Proofing', desc: 'Preventing water condensation drips on delicate bao buns.' }
    ]
  },
  elena: {
    name: 'Chef Elena Vance',
    category: 'ARTISAN DESSERTS',
    truck: 'Sugar & Spice Waffle Co.',
    rating: '4.96 (890 reviews)',
    badge: 'Master Patissier & Gelato Maker',
    roleLine: 'Master Patissier • Pearl Sugar Waffles & Gelato',
    portraitImg: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80',
    dishImg: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    dishTitle: 'Belgian Pearl Waffle & Gelato Stack',
    bio: 'Belgian-trained pastry chef crafting authentic caramelized pearl sugar Liège waffles topped with Madagascar vanilla bean gelato and berry compote.',
    pedagogyTitle: 'Sugar Crystallization & Dairy Emulsion Dynamics',
    pedagogyLead: 'Elena trains pastry chefs on yeast-leavened brioche dough rest times, Belgian cast iron waffle iron thermal zones, and churning dense Italian gelato with micro-ice crystal texture.',
    pedagogyModules: [
      { num: '01', title: 'Liège Brioche Proofing', desc: 'Overnight cold butter incorporation for tender flaky layers.' },
      { num: '02', title: 'Pearl Sugar Caramelization', desc: '375°F iron heat management to melt pearl sugar into glassy crunch.' },
      { num: '03', title: 'Gelato Density & Micro-Ice', desc: 'Slow churn air overrun suppression for velvety smooth mouthfeel.' }
    ]
  }
};

let currentChefKey = 'marcus';

function filterChefs(category) {
  const pills = document.querySelectorAll('.chef-filter-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-filter') === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.team-member-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    } else {
      card.style.display = 'none';
    }
  });

  showToast(`Filtered chefs: ${category.toUpperCase()}`, 'fa-filter');
}

function toggleChefPedagogy(chefKey, event) {
  if (event) {
    event.stopPropagation();
  }
  const card = document.getElementById(`chefCard-${chefKey}`);
  if (!card) return;

  const isOpen = card.classList.contains('pedagogy-open');
  
  document.querySelectorAll('.team-member-card').forEach(c => {
    if (c !== card) {
      c.classList.remove('pedagogy-open');
      const btn = c.querySelector('.team-pedagogy-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  const btn = card.querySelector('.team-pedagogy-btn');
  if (isOpen) {
    card.classList.remove('pedagogy-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  } else {
    card.classList.add('pedagogy-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    const chef = chefsData[chefKey] || chefsData.marcus;
    showToast(`Showing culinary pedagogy for ${chef.name}`, 'fa-graduation-cap');
  }
}

function openPedagogyModal(chefKey) {
  const chef = chefsData[chefKey] || chefsData.marcus;
  currentChefKey = chefKey;

  const modalImg = document.getElementById('pedagogyModalImg');
  const modalName = document.getElementById('pedagogyModalName');
  const modalSub = document.getElementById('pedagogyModalSub');
  const modalCat = document.getElementById('pedagogyModalCategory');
  const modalTitle = document.getElementById('pedagogyModalTitle');
  const modalDesc = document.getElementById('pedagogyModalDesc');
  const modalModules = document.getElementById('pedagogyModalModules');

  if (modalImg) modalImg.src = chef.portraitImg;
  if (modalName) modalName.textContent = chef.name;
  if (modalSub) modalSub.textContent = chef.roleLine;
  if (modalCat) modalCat.textContent = chef.category;
  if (modalTitle) modalTitle.textContent = chef.pedagogyTitle;
  if (modalDesc) modalDesc.textContent = chef.pedagogyLead;

  if (modalModules) {
    modalModules.innerHTML = chef.pedagogyModules.map(mod => `
      <div class="pedagogy-mod-card">
        <span class="pedagogy-mod-num">${mod.num}</span>
        <div class="pedagogy-mod-info">
          <strong>${mod.title}</strong>
          <p>${mod.desc}</p>
        </div>
      </div>
    `).join('');
  }

  const modal = document.getElementById('pedagogyModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePedagogyModal() {
  const modal = document.getElementById('pedagogyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function enrollInMasterclass() {
  const chef = chefsData[currentChefKey] || chefsData.marcus;
  closePedagogyModal();
  showToast(`Application submitted for ${chef.name}'s Masterclass! Our academy director will email you within 24h.`, 'fa-graduation-cap');
}

function openChefDetailModal(chefKey) {
  const chef = chefsData[chefKey] || chefsData.marcus;
  currentChefKey = chefKey;

  document.getElementById('chefModalDishImg').src = chef.dishImg;
  document.getElementById('chefModalBadge').textContent = chef.badge;
  document.getElementById('chefModalCategory').textContent = chef.category;
  document.getElementById('chefModalName').textContent = chef.name;
  document.getElementById('chefModalTruck').textContent = chef.truck;
  document.getElementById('chefModalBio').textContent = chef.bio;
  document.getElementById('chefModalDishTitle').textContent = chef.dishTitle;

  const modal = document.getElementById('chefDetailModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeChefDetailModal() {
  const modal = document.getElementById('chefDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function bookChefCatering(chefKey) {
  const key = chefKey || currentChefKey;
  const chef = chefsData[key] || chefsData.marcus;
  closeChefDetailModal();
  showToast(`Inquiry sent for ${chef.name} (${chef.truck})! Concierge connecting in 15 mins.`, 'fa-calendar-check');
}

function initModals() {
  const loginBtn = document.getElementById('loginBtn');
  const chefModal = document.getElementById('chefDetailModal');
  const pedagogyModal = document.getElementById('pedagogyModal');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === chefModal) closeChefDetailModal();
    if (e.target === pedagogyModal) closePedagogyModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeChefDetailModal();
      closePedagogyModal();
    }
  });
}

function openLoginModal() {
  window.location.href = 'login.html';
}

function closeLoginModal() {}

function openVendorSignupModal() {
  window.location.href = 'signup.html';
}

function openVendorPortalModal() {
  window.location.href = 'login.html';
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('newsletterForm');
  showToast('Subscribed! You will receive secret chef masterclass alerts.', 'fa-paper-plane');
  if (form) form.reset();
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

function showToast(message, icon = 'fa-circle-info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

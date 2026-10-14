document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initNavigation();
  initHeroSearch();
  initDirectoryFilters();
  initFavorites();
  initCateringCalculator();
  initModals();
  initScrollTop();
  initFoodTruckOdyssey();
  
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
    mobileLoginBtn.addEventListener('click', (e) => {
      window.location.href = 'login.html';
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

function initHeroSearch() {
  const heroSearchForm = document.getElementById('heroSearchForm');
  const cuisineSelect = document.getElementById('cuisineSelect');
  const locationInput = document.getElementById('locationInput');

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cuisine = cuisineSelect.value;
      const location = locationInput.value.trim() || 'Your area';

      const directorySection = document.getElementById('directory');
      if (directorySection) {
        directorySection.scrollIntoView({ behavior: 'smooth' });
      }

      if (cuisine !== 'all') {
        filterDirectory(cuisine);
      } else {
        filterDirectory('all');
      }

      showToast(`Showing gourmet trucks near "${location}"`, 'fa-magnifying-glass');
    });
  }
}

function initDirectoryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const loadMoreBtn = document.getElementById('loadMoreTrucksBtn');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      filterDirectory(filter);
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreTrucks();
    });
  }
}

function filterDirectory(category) {
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    if (tab.getAttribute('data-filter') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.truck-card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'translateY(15px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });
}

function loadMoreTrucks() {
  const trucksGrid = document.getElementById('trucksGrid');
  const loadMoreBtn = document.getElementById('loadMoreTrucksBtn');
  if (!trucksGrid || !loadMoreBtn) return;

  loadMoreBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Finding Nearby Trucks...';

  setTimeout(() => {
    const extraTrucks = [
      {
        category: 'bbq',
        name: 'Smokestack Heritage BBQ',
        img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
        rating: '4.9 (440)',
        loc: 'City Hall Square • 1.1 mi',
        desc: 'Maple bourbon smoked ribs, smoked turkey legs, and jalapeño cheddar cornbread.',
        price: '$14 - $32'
      },
      {
        category: 'pizza',
        name: 'Bella Napoli Mobile Oven',
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
        rating: '5.0 (310)',
        loc: 'Riverside Amphitheater • 0.7 mi',
        desc: 'Charred crust Margherita, white truffle mushroom calzones, and burrata salads.',
        price: '$16 - $26'
      }
    ];

    extraTrucks.forEach(t => {
      const card = document.createElement('div');
      card.className = 'truck-card';
      card.setAttribute('data-category', t.category);
      card.innerHTML = `
        <div class="truck-card-image-wrap">
          <img src="${t.img}" alt="${t.name}" loading="lazy">
          <span class="status-badge status-open"><span class="status-dot"></span> OPEN NOW</span>
          <span class="truck-cuisine-tag">${t.category.toUpperCase()}</span>
          <button class="favorite-btn" aria-label="Add to favorites"><i class="fa-regular fa-heart"></i></button>
        </div>
        <div class="truck-card-body">
          <div class="truck-header-row">
            <h3 class="truck-name">${t.name}</h3>
            <div class="truck-rating"><i class="fa-solid fa-star"></i> ${t.rating}</div>
          </div>
          <p class="truck-location"><i class="fa-solid fa-location-dot"></i> ${t.loc}</p>
          <p class="truck-desc">${t.desc}</p>
          <div class="truck-features">
            <span><i class="fa-solid fa-clock"></i> 10-15 min wait</span>
            <span><i class="fa-solid fa-utensils"></i> ${t.price}</span>
            <span><i class="fa-solid fa-shield-halved"></i> Certified</span>
          </div>
          <div class="truck-card-actions">
            <button class="btn btn-sm btn-outline-primary" onclick="openTruckDrawer('${t.name}')">View Menu</button>
            <button class="btn btn-sm btn-primary" onclick="openBookingWithTruck('${t.name}')">Book Truck</button>
          </div>
        </div>
      `;
      trucksGrid.appendChild(card);
    });

    initFavorites();
    loadMoreBtn.innerHTML = '<i class="fa-solid fa-check"></i> All 50+ Local Trucks Loaded';
    loadMoreBtn.disabled = true;
    showToast('Loaded 2 more gourmet trucks!', 'fa-truck-fast');
  }, 700);
}

function initFavorites() {
  const favBtns = document.querySelectorAll('.favorite-btn');
  favBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      btn.classList.toggle('favorited');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('favorited')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        showToast('Saved truck to your Food Feast favorites!', 'fa-heart');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    };
  });
}

function initCateringCalculator() {
  const eventDateInput = document.getElementById('eventDate');
  if (eventDateInput) {
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 14);
    eventDateInput.value = nextDate.toISOString().split('T')[0];
  }
  calculateEstimate();
}

function updateGuestSlider(val) {
  const badge = document.getElementById('guestCountBadge');
  if (badge) {
    badge.textContent = `${val} Guests`;
  }
  calculateEstimate();
}

function calculateEstimate() {
  const guestSlider = document.getElementById('guestSlider');
  const eventType = document.getElementById('calcEventType');
  const cuisineType = document.getElementById('calcCuisine');
  const priceDisplay = document.getElementById('estimatePriceDisplay');

  if (!guestSlider || !eventType || !cuisineType || !priceDisplay) return;

  const guests = parseInt(guestSlider.value, 10) || 75;

  let baseRatePerGuest = 14;
  if (cuisineType.value === 'bbq') baseRatePerGuest = 16;
  if (cuisineType.value === 'burgers') baseRatePerGuest = 13;
  if (cuisineType.value === 'tacos') baseRatePerGuest = 12;
  if (cuisineType.value === 'pizza') baseRatePerGuest = 15;
  if (cuisineType.value === 'multi') baseRatePerGuest = 19;

  let eventMultiplier = 1.0;
  if (eventType.value === 'wedding') eventMultiplier = 1.25;
  if (eventType.value === 'corporate') eventMultiplier = 1.1;
  if (eventType.value === 'festival') eventMultiplier = 0.95;

  const minTotal = Math.round(guests * baseRatePerGuest * eventMultiplier * 0.9);
  const maxTotal = Math.round(guests * baseRatePerGuest * eventMultiplier * 1.3);

  priceDisplay.textContent = `$${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`;
}

function handleCateringSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const date = document.getElementById('eventDate').value;
  const guests = document.getElementById('guestSlider').value;

  showToast(`Thank you ${name}! Catering request received for ${guests} guests on ${date}. A coordinator will contact you shortly.`, 'fa-champagne-glasses');

  const form = document.getElementById('cateringForm');
  if (form) {
    form.reset();
    updateGuestSlider(75);
  }
}

const dishesData = {
  ribs: {
    title: 'Grilled Pork Ribs Platter',
    category: 'SMOKED BBQ & GRILLS',
    price: '$35.50',
    rawPrice: 35.50,
    rating: '4.9 (240 reviews)',
    img: 'assets/grilled_ribs.jpg',
    truck: 'The Lone Star Pitmaster',
    desc: 'Signature 12-hour hickory smoked St. Louis style ribs drenched in house bourbon brown sugar glaze. Served with hand-cut roasted potato wedges, artisan pickled slaw, and dipping sauces.',
    badge: 'Chef Signature'
  },
  burger: {
    title: 'Toast Brioche Smash Burger & Fries',
    category: 'GOURMET SMASH BURGERS',
    price: '$17.50',
    rawPrice: 17.50,
    rating: '4.8 (390 reviews)',
    img: 'assets/toast_burger.jpg',
    truck: 'Sizzle & Bun Mobile',
    desc: 'Double dry-aged Angus beef smash patties with caramelized onions, aged Wisconsin cheddar, truffle garlic aioli on a toasted buttered brioche bun with a basket of crispy seasoned onion rings.',
    badge: 'Customer Favorite'
  },
  steak: {
    title: 'Gourmet Porterhouse Ribeye Steak',
    category: 'PRIME STEAKHOUSE TRUCK',
    price: '$55.50',
    rawPrice: 55.50,
    rating: '5.0 (180 reviews)',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    truck: 'The Lone Star Pitmaster',
    desc: 'Charcoal grilled 18oz USDA Prime Porterhouse steak basted with rosemary bone marrow butter, served with sea salt fries, grilled lemon, and house chimichurri.',
    badge: 'Master Pitmaster Cut'
  }
};

let currentDishKey = 'ribs';
let currentQty = 1;

function initModals() {
  const loginBtn = document.getElementById('loginBtn');
  const quickViewModal = document.getElementById('quickViewModal');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      closeQuickViewModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickViewModal();
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

function openDishModal(dishKey) {
  const dish = dishesData[dishKey] || dishesData.ribs;
  currentDishKey = dishKey;
  currentQty = 1;

  document.getElementById('quickViewImg').src = dish.img;
  document.getElementById('quickViewCategory').textContent = dish.category;
  document.getElementById('quickViewTitle').textContent = dish.title;
  document.getElementById('quickViewPrice').textContent = dish.price;
  document.getElementById('quickViewDesc').textContent = dish.desc;
  document.getElementById('quickViewTruckName').textContent = dish.truck;
  document.getElementById('quickViewBadge').textContent = dish.badge;
  document.getElementById('quickViewQty').textContent = '1';
  document.getElementById('quickViewTotalBtn').textContent = dish.price;

  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function adjustQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('quickViewQty').textContent = currentQty;

  const dish = dishesData[currentDishKey] || dishesData.ribs;
  const total = (dish.rawPrice * currentQty).toFixed(2);
  document.getElementById('quickViewTotalBtn').textContent = `$${total}`;
}

function simulateAddToCart() {
  const dish = dishesData[currentDishKey] || dishesData.ribs;
  closeQuickViewModal();
  showToast(`Added ${currentQty}x ${dish.title} to your cart!`, 'fa-bag-shopping');
}

function openTruckDrawer(truckName) {
  showToast(`Opening live menu and schedule for ${truckName}...`, 'fa-truck-fast');
  openDishModal('ribs');
}

function openBookingWithTruck(truckName) {
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected "${truckName}" for event booking!`, 'fa-calendar-check');
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('newsletterForm');
  showToast('Subscribed! You will receive live food truck pop-up alerts.', 'fa-paper-plane');
  if (form) form.reset();
}

function startConciergeChat() {
  showToast('Connecting to 24/7 Street Food Concierge... Live agent ready!', 'fa-comments');
}

function handleQuickInquiry(e) {
  e.preventDefault();
  const input = document.getElementById('quickInquiryInput');
  const query = input ? input.value.trim() : '';
  if (query) {
    showToast(`Inquiry received: "${query}". Concierge checking truck routes & availability!`, 'fa-wand-magic-sparkles');
    if (input) input.value = '';
  }
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

function initFoodTruckOdyssey() {
  const mover = document.getElementById('miniTruckMover');
  const statusText = document.getElementById('truckStatusText');
  const honkBubble = document.getElementById('truckHonkBubble');
  const waypoints = document.querySelectorAll('.transit-waypoint');

  if (!mover || !statusText) return;

  const telemetryStages = [
    { threshold: 0, text: '🔥 Firing Up Smoker & Flat-Top...', wp: 'wpDepot' },
    { threshold: 24, text: '🚚 En Route • Speed: 26 MPH • ETA 12m', wp: 'wpDepot' },
    { threshold: 48, text: '📍 Midtown Food Rally • Grills Sizzling!', wp: 'wpRally' },
    { threshold: 74, text: '🍔 Order Fresh & Hot • Approaching Stage', wp: 'wpRally' },
    { threshold: 92, text: '⭐ Arrived at Feast Stage! Ready to Serve!', wp: 'wpFest' }
  ];

  const cycleDurationMs = 16000;
  const startTime = Date.now();
  let manualOverrideTimeout = null;

  function updateTelemetry() {
    if (!manualOverrideTimeout) {
      const elapsed = (Date.now() - startTime) % cycleDurationMs;
      const progressPercent = (elapsed / cycleDurationMs) * 100;

      let currentStage = telemetryStages[0];
      for (let i = telemetryStages.length - 1; i >= 0; i--) {
        if (progressPercent >= telemetryStages[i].threshold) {
          currentStage = telemetryStages[i];
          break;
        }
      }

      if (statusText.textContent !== currentStage.text) {
        statusText.textContent = currentStage.text;
        waypoints.forEach(wp => {
          if (wp.id === currentStage.wp) {
            wp.classList.add('active');
          } else {
            wp.classList.remove('active');
          }
        });
      }
    }

    requestAnimationFrame(updateTelemetry);
  }

  requestAnimationFrame(updateTelemetry);

  mover.addEventListener('click', () => {
    if (honkBubble) {
      honkBubble.classList.add('show');
      mover.classList.add('truck-nitro-boost');

      setTimeout(() => {
        honkBubble.classList.remove('show');
      }, 1500);

      setTimeout(() => {
        mover.classList.remove('truck-nitro-boost');
      }, 900);
    }
  });

  waypoints.forEach(wp => {
    wp.addEventListener('click', (e) => {
      e.stopPropagation();
      const stop = wp.getAttribute('data-stop');
      waypoints.forEach(w => w.classList.remove('active'));
      wp.classList.add('active');

      if (stop === 'start') {
        statusText.textContent = '🔥 Grill Depot • Sizzling BBQ Prepped!';
      } else if (stop === 'mid') {
        statusText.textContent = '📍 Midtown Rally • Live Food Park Station!';
      } else if (stop === 'end') {
        statusText.textContent = '⭐ Feast Stage VIP • Delivery Complete!';
      }

      clearTimeout(manualOverrideTimeout);
      manualOverrideTimeout = setTimeout(() => {
        manualOverrideTimeout = null;
      }, 4000);
    });
  });
}

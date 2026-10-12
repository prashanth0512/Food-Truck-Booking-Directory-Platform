document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initNavigation();
  initCircleCarousel();
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

let currentActiveCircleIndex = 0;
let circleCarouselTimer = null;
let isCircleCarouselRunning = true;
const CIRCLE_INTERVAL_MS = 2000; 

function initCircleCarousel() {
  const viewport = document.getElementById('circleStageViewport');
  const container = document.getElementById('circleStageContainer');
  const cards = Array.from(document.querySelectorAll('.circle-truck-card'));
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const togglePlayBtn = document.getElementById('carouselTogglePlayBtn');
  const playIcon = document.getElementById('carouselPlayIcon');
  const statusText = document.getElementById('carouselStatusText');
  const dots = Array.from(document.querySelectorAll('.stage-dot'));

  if (!container || cards.length === 0) return;

  const totalCards = cards.length;

  function updateStagePositions(newIndex, animateRotate = true) {
    currentActiveCircleIndex = ((newIndex % totalCards) + totalCards) % totalCards;

    cards.forEach((card, i) => {
      
      let diff = (i - currentActiveCircleIndex) % totalCards;
      if (diff < -Math.floor(totalCards / 2)) diff += totalCards;
      if (diff > Math.floor(totalCards / 2)) diff -= totalCards;

      card.classList.remove(
        'is-center',
        'is-left-1',
        'is-right-1',
        'is-left-2',
        'is-right-2',
        'is-hidden',
        'animate-center-rotate'
      );

      if (diff === 0) {
        card.classList.add('is-center');
        if (animateRotate) {
          card.classList.add('animate-center-rotate');
          setTimeout(() => {
            card.classList.remove('animate-center-rotate');
          }, 750);
        }
      } else if (diff === -1) {
        card.classList.add('is-left-1');
      } else if (diff === 1) {
        card.classList.add('is-right-1');
      } else if (diff === -2) {
        card.classList.add('is-left-2');
      } else if (diff === 2) {
        card.classList.add('is-right-2');
      } else {
        card.classList.add('is-hidden');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.remove('active');
      if (idx === currentActiveCircleIndex) {
        dot.classList.add('active');
        
        const progress = dot.querySelector('.dot-progress');
        if (progress) {
          progress.style.animation = 'none';
          void progress.offsetWidth; 
          progress.style.animation = '';
        }
      }
    });

    const activeCard = cards[currentActiveCircleIndex];
    if (activeCard && statusText && isCircleCarouselRunning) {
      const truckName = activeCard.querySelector('.circle-truck-name')?.textContent || 'Food Truck';
      statusText.innerHTML = `Live Spotlight: <strong style="color:var(--accent-yellow);">${truckName}</strong> (2s Rotation)`;
    }
  }

  function startAutomatedTimer() {
    clearTimeout(circleCarouselTimer);
    clearInterval(circleCarouselTimer);
    if (!isCircleCarouselRunning) return;

    circleCarouselTimer = setInterval(() => {
      updateStagePositions(currentActiveCircleIndex + 1, true);
    }, CIRCLE_INTERVAL_MS);
  }

  function pauseAutomatedTimer(isHover = false) {
    clearInterval(circleCarouselTimer);
    if (viewport) viewport.classList.add('carousel-paused');
    if (isHover && statusText) {
      statusText.innerHTML = `Live Radar Paused (Inspecting Truck)`;
    }
  }

  function resumeAutomatedTimer() {
    if (viewport) viewport.classList.remove('carousel-paused');
    startAutomatedTimer();
  }

  updateStagePositions(0, false);
  startAutomatedTimer();

  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      
      if (card.classList.contains('is-center')) {
        const modalKey = card.getAttribute('data-modal') || 'bbq_pit';
        openHome2DishModal(modalKey);
      } else {
        
        updateStagePositions(index, true);
        startAutomatedTimer();
      }
    });
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      updateStagePositions(dotIndex, true);
      startAutomatedTimer();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateStagePositions(currentActiveCircleIndex - 1, true);
      startAutomatedTimer();
      showToast('Rotated to previous food truck', 'fa-rotate-left');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateStagePositions(currentActiveCircleIndex + 1, true);
      startAutomatedTimer();
      showToast('Rotated to next food truck', 'fa-rotate-right');
    });
  }

  if (togglePlayBtn) {
    togglePlayBtn.addEventListener('click', () => {
      isCircleCarouselRunning = !isCircleCarouselRunning;
      if (playIcon) {
        playIcon.className = isCircleCarouselRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play';
      }
      if (isCircleCarouselRunning) {
        resumeAutomatedTimer();
        showToast('2-second automated radar resumed', 'fa-play');
      } else {
        pauseAutomatedTimer(false);
        if (statusText) statusText.textContent = 'Automated Rotation Paused';
        showToast('Automated radar paused', 'fa-pause');
      }
    });
  }

  if (viewport) {
    viewport.addEventListener('mouseenter', () => {
      pauseAutomatedTimer(true);
    });

    viewport.addEventListener('mouseleave', () => {
      if (isCircleCarouselRunning) {
        resumeAutomatedTimer();
      }
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutomatedTimer(true);
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        updateStagePositions(currentActiveCircleIndex + 1, true);
      } else {
        updateStagePositions(currentActiveCircleIndex - 1, true);
      }
    }
    if (isCircleCarouselRunning) {
      resumeAutomatedTimer();
    }
  }, { passive: true });
}

function filterCircleTrucks(category) {
  const cards = Array.from(document.querySelectorAll('.circle-truck-card'));
  const targetIndex = cards.findIndex(c => category === 'all' || c.getAttribute('data-dish') === category);
  if (targetIndex !== -1) {
    const prevBtn = document.getElementById('carouselPrevBtn');
    if (prevBtn) {
      
      cards.forEach((c, idx) => {
        if (idx === targetIndex) {
          c.click();
        }
      });
    }
  }
  showToast(`Radar targeted cuisine: ${category.toUpperCase()}`, 'fa-filter');
}

const home2DishesData = {
  bbq_pit: {
    title: 'Grand Wagyu Smoked Ribs Platter',
    category: '16-HOUR HICKORY SMOKED BBQ',
    price: '$35.50',
    rawPrice: 35.50,
    rating: '4.9 (380 reviews)',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    truck: 'The Lone Star Pitmaster',
    desc: 'Signature 16-hour hickory wood slow-smoked St. Louis style ribs basted in bourbon brown sugar glaze. Served with hand-cut roasted potatoes and pickled slaw.',
    badge: 'Master Pitmaster Cut'
  },
  burger_mobile: {
    title: 'Truffle Angus Smash Burger Platter',
    category: 'GOURMET SMASH BURGERS',
    price: '$18.50',
    rawPrice: 18.50,
    rating: '4.8 (420 reviews)',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    truck: 'Sizzle & Bun Mobile',
    desc: 'Double dry-aged Angus smash patties, smoked bacon jam, Wisconsin aged cheddar, and house truffle aioli on toasted brioche buns with rosemary fries.',
    badge: 'Customer Top Rated'
  },
  birria_tacos: {
    title: 'Quesabirria Street Tacos Supreme',
    category: 'OAXACAN ARTISAN TACOS',
    price: '$16.00',
    rawPrice: 16.00,
    rating: '4.9 (610 reviews)',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    truck: 'El Fuego Birria Bus',
    desc: 'Three handmade stone-ground corn tortillas crisped on flat-top grill, filled with slow-cooked beef birria, melted Oaxaca cheese, cilantro, onions, and rich consommé dip.',
    badge: 'Heritage Recipe'
  },
  pizza_crust: {
    title: 'Neapolitan San Marzano Margherita',
    category: '900° WOOD-FIRED PIZZA',
    price: '$17.00',
    rawPrice: 17.00,
    rating: '5.0 (290 reviews)',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    truck: 'Rolling Crust Oven',
    desc: 'Hand-stretched 48-hour fermented dough baked at 900 degrees with San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and extra virgin olive oil.',
    badge: 'Wood-Fired Special'
  },
  bao_wok: {
    title: 'Steamed Pork Belly Gua Bao Duo',
    category: 'ASIAN STREET WOK',
    price: '$14.50',
    rawPrice: 14.50,
    rating: '4.7 (350 reviews)',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    truck: 'Dragon Wok & Bao',
    desc: 'Fluffy steamed lotus buns stuffed with braised 5-spice pork belly, crushed roasted peanuts, pickled mustard greens, and sweet chili hoisin glaze.',
    badge: 'Chef Favorite'
  },
  waffle_co: {
    title: 'Belgian Pearl Waffle & Gelato Stack',
    category: 'ARTISANAL DESSERT BUS',
    price: '$12.00',
    rawPrice: 12.00,
    rating: '5.0 (520 reviews)',
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    truck: 'Sugar & Spice Waffle Co.',
    desc: 'Freshly baked Liège pearl sugar waffle topped with Madagascar vanilla bean gelato, warm hazelnut chocolate drizzle, and fresh hand-cut strawberries.',
    badge: 'Sweet Sensation'
  },
  gyro_express: {
    title: 'Santorini Lamb & Beef Gyro Wrap',
    category: 'GREEK STREET SOUVLAKI',
    price: '$15.00',
    rawPrice: 15.00,
    rating: '4.9 (280 reviews)',
    img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    truck: 'Santorini Gyro Truck',
    desc: 'Warm flame-grilled pita wrapped with shaved rotisserie lamb & beef, house garlic tzatziki, crisp cucumber, tomatoes, and spiced sea salt potato fries.',
    badge: 'Mediterranean Feast'
  },
  baja_seafood: {
    title: 'Crispy Baja Fish Tacos Trio',
    category: 'PACIFIC COAST SEAFOOD',
    price: '$16.50',
    rawPrice: 16.50,
    rating: '4.8 (340 reviews)',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    truck: 'Pacific Coast Baja',
    desc: 'Beer-battered fresh Pacific whitefish in charred corn tortillas with lime chipotle crema, shredded purple cabbage, avocado slices, and pico de gallo.',
    badge: 'Coastal Catch'
  }
};

let currentDishKey = 'bbq_pit';
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

function openHome2DishModal(dishKey) {
  const dish = home2DishesData[dishKey] || home2DishesData.bbq_pit;
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

  const dish = home2DishesData[currentDishKey] || home2DishesData.bbq_pit;
  const total = (dish.rawPrice * currentQty).toFixed(2);
  document.getElementById('quickViewTotalBtn').textContent = `$${total}`;
}

function simulateAddToCart() {
  const dish = home2DishesData[currentDishKey] || home2DishesData.bbq_pit;
  closeQuickViewModal();
  showToast(`Added ${currentQty}x ${dish.title} to your cart!`, 'fa-bag-shopping');
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('newsletterForm');
  showToast('Subscribed! You will receive live food truck pop-up alerts.', 'fa-paper-plane');
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

function initScrollAnimations() {
  const animatedSections = document.querySelectorAll(
    '.home2-dish-points-section, .home2-about-section, .home2-process-section, .home2-testimonials-section'
  );
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    animatedSections.forEach(section => observer.observe(section));
  } else {
    animatedSections.forEach(section => section.classList.add('in-view'));
  }
}

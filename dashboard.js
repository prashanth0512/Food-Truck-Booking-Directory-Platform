let vendorSchedules = [
  {
    id: 'sch-1',
    day: 'Monday, Oct 19',
    venue: 'Austin Downtown Tech District Hub',
    address: '412 Congress Ave, Austin, TX',
    shift: '11:00 AM – 3:30 PM CST',
    footfall: '1,200+ Tech Employees',
    permit: 'Confirmed',
    permitClass: 'confirmed'
  },
  {
    id: 'sch-2',
    day: 'Tuesday, Oct 20',
    venue: 'South Congress Arts & Food Court',
    address: '1600 S Congress Ave, Austin, TX',
    shift: '11:00 AM – 9:00 PM CST',
    footfall: '850+ Tourists & Locals',
    permit: 'Confirmed',
    permitClass: 'confirmed'
  },
  {
    id: 'sch-3',
    day: 'Wednesday, Oct 21',
    venue: 'Domain Northside Business Park',
    address: '11821 Domain Dr, Austin, TX',
    shift: '11:30 AM – 4:00 PM CST',
    footfall: '1,500+ Office Lunchers',
    permit: 'Confirmed',
    permitClass: 'confirmed'
  },
  {
    id: 'sch-4',
    day: 'Thursday, Oct 22',
    venue: 'Rainey St Craft Brewery Taproom',
    address: '74 Rainey St, Austin, TX',
    shift: '4:00 PM – 11:00 PM CST',
    footfall: '950+ Evening Revelers',
    permit: 'Confirmed',
    permitClass: 'confirmed'
  },
  {
    id: 'sch-5',
    day: 'Friday, Oct 23',
    venue: 'East Austin Night Street Market',
    address: '1100 E 6th St, Austin, TX',
    shift: '5:00 PM – 12:00 AM CST',
    footfall: '2,200+ Foodies Rally',
    permit: 'Confirmed',
    permitClass: 'confirmed'
  },
  {
    id: 'sch-6',
    day: 'Saturday, Oct 24',
    venue: 'Barton Creek VIP Private Wedding Catering',
    address: '8212 Barton Club Dr, Austin, TX',
    shift: '4:00 PM – 10:00 PM CST',
    footfall: '280 VIP Wedding Guests',
    permit: 'Pending Permit',
    permitClass: 'pending'
  }
];

let vendorMenuItems = [
  {
    id: 'menu-1',
    name: '16-Hr Smoked Texas Prime Brisket',
    category: 'bbq',
    categoryName: '🔥 Smoked BBQ',
    price: 22.50,
    prepTime: '6–8 Mins',
    photo: 'assets/grilled_ribs.jpg',
    desc: 'Hickory wood slow-smoked prime beef brisket with 14-spice dry rub, pickled red onions, jalapeño slaw, and butter toasted Texas toast.',
    tags: ['Hickory Smoked', '14-Spice Dry Rub', 'Gluten-Free Option'],
    inStock: true
  },
  {
    id: 'menu-2',
    name: 'Glazed Brown Sugar St. Louis Ribs',
    category: 'bbq',
    categoryName: '🔥 Smoked BBQ',
    price: 24.00,
    prepTime: '7–9 Mins',
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    desc: 'Half rack of tender fall-off-the-bone pork ribs basted in bourbon brown sugar barbecue glaze with crisp fries.',
    tags: ['Bourbon Glaze', 'Customer Favorite'],
    inStock: true
  },
  {
    id: 'menu-3',
    name: 'Double Truffle Wagyu Smash Burger',
    category: 'burgers',
    categoryName: '🍔 Smash Burgers',
    price: 16.50,
    prepTime: '5–7 Mins',
    photo: 'assets/toast_burger.jpg',
    desc: 'Two 4oz smashed dry-aged patties, black truffle aioli, aged sharp cheddar, caramelized shallots on toasted brioche.',
    tags: ['Wagyu Blend', 'Truffle Aioli', 'Halal Available'],
    inStock: true
  },
  {
    id: 'menu-4',
    name: 'Oaxacan Quesabirria Tacos Supreme',
    category: 'bbq',
    categoryName: '🔥 Smoked BBQ',
    price: 15.00,
    prepTime: '4–6 Mins',
    photo: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
    desc: 'Three grilled corn tortillas stuffed with 16-hour slow cooked shredded beef, melted Oaxaca cheese, cilantro, and rich consommé dip.',
    tags: ['16-Hr Consommé', 'Artisan Corn Masa'],
    inStock: true
  },
  {
    id: 'menu-5',
    name: 'Loaded Smoked Brisket Queso Fries',
    category: 'sides',
    categoryName: '🍟 Loaded Sides',
    price: 12.00,
    prepTime: '4–5 Mins',
    photo: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    desc: 'Crispy skin-on golden french fries smothered in house craft beer queso, chopped smoked brisket, cotija, and green onions.',
    tags: ['House Beer Queso', 'Shareable'],
    inStock: true
  },
  {
    id: 'menu-6',
    name: 'Wood-Fired Churro Bites with Salted Dulce',
    category: 'drinks',
    categoryName: '🥤 Drinks & Sweets',
    price: 8.50,
    prepTime: '3–4 Mins',
    photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    desc: 'Crispy fried dough tossed in cinnamon Mexican sugar served with hot salted dulce de leche dipping sauce.',
    tags: ['Fresh Daily', 'Vegetarian'],
    inStock: true
  },
  {
    id: 'menu-7',
    name: 'Smoked Hibiscus Peach Cold Brew Tea',
    category: 'drinks',
    categoryName: '🥤 Drinks & Sweets',
    price: 5.50,
    prepTime: '1–2 Mins',
    photo: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    desc: 'Cold-steeped organic hibiscus blossom tea infused with Texas peaches, clover honey, and crushed mint.',
    tags: ['100% Organic', 'Refreshing'],
    inStock: true
  },
  {
    id: 'menu-8',
    name: 'Hickory Smoked Pulled Pork Sandwich',
    category: 'bbq',
    categoryName: '🔥 Smoked BBQ',
    price: 14.50,
    prepTime: '5–6 Mins',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    desc: 'Tender pulled pork shoulder piled high on buttery brioche with apple cider vinegar mop sauce and crispy slaw.',
    tags: ['Slow Smoked', 'Classic'],
    inStock: false
  }
];

let vendorOrders = [
  {
    id: '1042',
    customer: 'Elena Rostova',
    phone: '(512) 840-9921',
    items: [
      { name: '16-Hr Smoked Texas Prime Brisket', qty: 2, note: 'Extra BBQ mop sauce on the side' },
      { name: 'Loaded Smoked Brisket Queso Fries', qty: 1, note: '' }
    ],
    total: 57.00,
    type: 'Curbside Pickup',
    time: '2 mins ago',
    eta: '5 min prep remaining',
    status: 'incoming'
  },
  {
    id: '1041',
    customer: 'David Chen',
    phone: '(512) 330-1124',
    items: [
      { name: 'Double Truffle Wagyu Smash Burger', qty: 2, note: 'Well-done smash crispy edges' },
      { name: 'Smoked Hibiscus Peach Cold Brew Tea', qty: 2, note: '' }
    ],
    total: 44.00,
    type: 'Curbside Pickup',
    time: '6 mins ago',
    eta: 'Cooking on cast iron plancha',
    status: 'cooking'
  },
  {
    id: '1040',
    customer: 'Maya Lin (Dell Technologies)',
    phone: '(512) 991-8843',
    items: [
      { name: 'Glazed Brown Sugar St. Louis Ribs', qty: 4, note: 'Corporate lunch catering box' },
      { name: '16-Hr Smoked Texas Prime Brisket', qty: 4, note: 'Individual containers' }
    ],
    total: 186.00,
    type: 'Catering Drop-Off',
    time: '12 mins ago',
    eta: 'Smoking in white oak pit',
    status: 'cooking'
  },
  {
    id: '1039',
    customer: 'Sarah Jenkins',
    phone: '(512) 441-2098',
    items: [
      { name: 'Oaxacan Quesabirria Tacos Supreme', qty: 3, note: 'Extra lime wedges and spicy salsa' }
    ],
    total: 45.00,
    type: 'Walk-Up Mobile App',
    time: '18 mins ago',
    eta: 'Bagged & Ready at Window',
    status: 'ready'
  },
  {
    id: '1038',
    customer: 'Marcus Vance',
    phone: '(512) 552-9104',
    items: [
      { name: 'Double Truffle Wagyu Smash Burger', qty: 1, note: 'No pickles' },
      { name: 'Wood-Fired Churro Bites', qty: 1, note: '' }
    ],
    total: 25.00,
    type: 'Curbside Pickup',
    time: '24 mins ago',
    eta: 'On grill',
    status: 'cooking'
  },
  {
    id: '1037',
    customer: 'Liam O\'Connor',
    phone: '(512) 774-8832',
    items: [
      { name: 'Loaded Smoked Brisket Queso Fries', qty: 2, note: 'Pickled jalapeños on top' }
    ],
    total: 24.00,
    type: 'Curbside Pickup',
    time: '31 mins ago',
    eta: 'New online order received',
    status: 'incoming'
  }
];

let vendorPayouts = [
  {
    ref: 'PAY-2026-981',
    date: 'Oct 08, 2026',
    batch: 'Weekly Shift Settlement (Austin Metro)',
    method: 'Direct ACH (Chase **** 4821)',
    gross: 4850.00,
    status: 'Completed'
  },
  {
    ref: 'PAY-2026-980',
    date: 'Oct 01, 2026',
    batch: 'Corporate Luncheon Event #883 (Atlassian)',
    method: 'Direct ACH (Chase **** 4821)',
    gross: 6200.00,
    status: 'Completed'
  },
  {
    ref: 'PAY-2026-979',
    date: 'Sep 24, 2026',
    batch: 'Weekly Shift Settlement (Austin Metro)',
    method: 'Direct ACH (Chase **** 4821)',
    gross: 5410.00,
    status: 'Completed'
  },
  {
    ref: 'PAY-2026-978',
    date: 'Sep 17, 2026',
    batch: 'Weekend Night Market Pop-Up Festival',
    method: 'Direct ACH (Chase **** 4821)',
    gross: 7890.00,
    status: 'Completed'
  },
  {
    ref: 'PAY-2026-977',
    date: 'Sep 10, 2026',
    batch: 'VIP Celebrity Wedding Catering (Barton Creek)',
    method: 'Wire Settlement (Chase **** 4821)',
    gross: 8500.00,
    status: 'Completed'
  }
];

let revenueChartInstance = null;
let donutChartInstance = null;
let dishesChartInstance = null;

let currentMenuCategory = 'all';
let currentOrderStatus = 'all';
let currentMenuSearch = '';
let currentOrderSearch = '';

document.addEventListener('DOMContentLoaded', () => {
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const savedTheme = localStorage.getItem('ff_theme') || localStorage.getItem('foodfeast_theme') || 'light';
  const canonicalTheme = (savedTheme === 'charcoal' || savedTheme === 'dark') ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', canonicalTheme);
  localStorage.setItem('ff_theme', canonicalTheme);
  localStorage.setItem('foodfeast_theme', canonicalTheme);
  updateThemeLucideIcon(canonicalTheme);

  renderOverviewRecentOrders();
  renderSchedulesTable();
  renderMenuItems();
  renderOrdersQueue();
  renderPayoutsTable();

  initOverviewCharts();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notificationDropdownWrap') && !e.target.closest('#profileDropdownWrap')) {
      closeDropdowns();
    }
  });
});

function switchDashboardView(viewId) {
  
  document.querySelectorAll('.sidebar-nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const activeNavLink = document.querySelector(`.sidebar-nav-link[data-view="${viewId}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }

  document.querySelectorAll('.dashboard-view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(`view-${viewId}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  if (viewId === 'overview') {
    setTimeout(() => {
      if (revenueChartInstance) revenueChartInstance.resize();
      if (donutChartInstance) donutChartInstance.resize();
      if (dishesChartInstance) dishesChartInstance.resize();
    }, 50);
  }

  toggleMobileSidebar(false);

  const mainContent = document.getElementById('dashboardContentArea');
  if (mainContent) mainContent.scrollTop = 0;
}

function initOverviewCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet or blocked.');
    return;
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.getAttribute('data-theme') === 'charcoal';
  const textColor = isDark ? '#E2D0C7' : '#57504C';
  const gridColor = isDark ? '#5A403A' : '#E6CFC3';
  const primaryColor = isDark ? '#F16A60' : '#C94040';
  const accentColor = isDark ? '#F5BD58' : '#F2B544';
  const tooltipBg = isDark ? '#2B2220' : '#FFFFFF';
  const tooltipBorder = isDark ? '#5A403A' : '#E6CFC3';
  const tooltipText = isDark ? '#FFF3EB' : '#292524';

  const revenueCtx = document.getElementById('revenueLineChart');
  if (revenueCtx) {
    if (revenueChartInstance) revenueChartInstance.destroy();

    const gradientPrimary = revenueCtx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientPrimary.addColorStop(0, isDark ? 'rgba(241, 106, 96, 0.35)' : 'rgba(201, 64, 64, 0.25)');
    gradientPrimary.addColorStop(1, isDark ? 'rgba(241, 106, 96, 0.0)' : 'rgba(201, 64, 64, 0.0)');

    revenueChartInstance = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
        datasets: [
          {
            label: 'Gross Sales ($)',
            data: [320, 1450, 2890, 1820, 940, 1280, 2460, 3180, 2920, 1640, 890],
            borderColor: primaryColor,
            backgroundColor: gradientPrimary,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: primaryColor,
            pointBorderColor: isDark ? '#FFF3EB' : '#FFFFFF',
            pointRadius: 4,
            pointHoverRadius: 7,
            yAxisID: 'y'
          },
          {
            label: 'Order Count',
            data: [8, 38, 72, 44, 22, 31, 58, 84, 76, 42, 20],
            borderColor: accentColor,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointBackgroundColor: accentColor,
            pointRadius: 3,
            pointHoverRadius: 6,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: primaryColor,
            bodyColor: tooltipText,
            borderColor: tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return ` Gross Sales: $${context.parsed.y.toLocaleString()}`;
                }
                return ` Order Count: ${context.parsed.y} Orders`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Outfit', size: 11 } }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: 'Outfit', size: 11 },
              callback: value => `$${value}`
            }
          },
          y1: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }

  const donutCtx = document.getElementById('salesDonutChart');
  if (donutCtx) {
    if (donutChartInstance) donutChartInstance.destroy();

    donutChartInstance = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Corporate Catering', 'Curbside Pre-Order', 'Walk-Up Street POS'],
        datasets: [{
          data: [52, 32, 16],
          backgroundColor: isDark ? ['#F16A60', '#F5BD58', '#72D49A'] : ['#C94040', '#F2B544', '#287447'],
          borderColor: isDark ? '#2B2220' : '#FFFFFF',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: primaryColor,
            bodyColor: tooltipText,
            borderWidth: 1,
            borderColor: tooltipBorder,
            padding: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      }
    });
  }

  const dishesCtx = document.getElementById('topDishesBarChart');
  if (dishesCtx) {
    if (dishesChartInstance) dishesChartInstance.destroy();

    dishesChartInstance = new Chart(dishesCtx, {
      type: 'bar',
      data: {
        labels: ['Prime Brisket', 'Glazed Ribs', 'Wagyu Smash', 'Quesabirria', 'Brisket Fries'],
        datasets: [{
          label: 'Orders Sold',
          data: [340, 295, 260, 210, 185],
          backgroundColor: isDark 
            ? ['#F16A60', '#FF8175', '#F5BD58', '#72D49A', '#87C8F2']
            : ['#C94040', '#A92F32', '#F2B544', '#287447', '#245C87'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: primaryColor,
            bodyColor: tooltipText,
            borderColor: tooltipBorder,
            borderWidth: 1,
            padding: 8,
            callbacks: {
              label: function(context) {
                return ` Volume: ${context.parsed.y} Sold this month`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { family: 'Outfit', size: 11 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Outfit', size: 11 } }
          }
        }
      }
    });
  }
}

function renderOverviewRecentOrders() {
  const tbody = document.getElementById('overviewRecentOrdersTableBody');
  if (!tbody) return;

  const recent = vendorOrders.slice(0, 5);
  tbody.innerHTML = recent.map(order => {
    const itemsSummary = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    return `
      <tr>
        <td><strong class="text-gold">#${order.id}</strong></td>
        <td><strong>${order.customer}</strong></td>
        <td><span style="font-size: 0.75rem; color: var(--text-dim);">${itemsSummary}</span></td>
        <td><strong class="text-gold">$${order.total.toFixed(2)}</strong></td>
        <td><span class="order-type-tag">${order.type}</span></td>
        <td><span style="font-size: 0.72rem;">${order.time}</span></td>
        <td><span class="status-tag ${order.status}"><span class="status-dot"></span> ${order.status.toUpperCase()}</span></td>
        <td>
          <button type="button" class="btn btn-primary btn-sm" onclick="switchDashboardView('orders')">
            Manage
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function setTimeframe(range) {
  document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.timeframe-btn[data-range="${range}"]`);
  if (btn) btn.classList.add('active');

  showToast(`Analytics timeframe updated to ${range.toUpperCase()}`, 'fa-clock');
  initOverviewCharts();
}

function refreshDashboardData() {
  showToast('Live telemetry refreshed from Austin Flagship Depot', 'fa-rotate');
  initOverviewCharts();
}

function renderSchedulesTable() {
  const tbody = document.getElementById('schedulesTableBody');
  if (!tbody) return;

  tbody.innerHTML = vendorSchedules.map((sch, index) => {
    return `
      <tr>
        <td><strong>${sch.day}</strong></td>
        <td><strong class="text-gold">${sch.venue}</strong></td>
        <td><span style="font-size: 0.76rem;"><i class="fa-solid fa-location-dot text-gold"></i> ${sch.address}</span></td>
        <td><span style="font-weight: 600;">${sch.shift}</span></td>
        <td><span class="badge-num dim">${sch.footfall}</span></td>
        <td><span class="status-tag ${sch.permitClass}"><span class="status-dot"></span> ${sch.permit}</span></td>
        <td>
          <button type="button" class="btn-icon-action" title="Edit Shift" onclick="editScheduleSlot('${sch.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleRadarBroadcastToggle(isChecked) {
  const label = document.getElementById('radarStatusLabel');
  if (label) {
    label.textContent = isChecked ? 'BROADCASTING LIVE' : 'BROADCAST PAUSED (OFF-DUTY)';
    label.style.color = isChecked ? '#22c55e' : '#e74c3c';
  }
  showToast(
    isChecked ? 'Live radar broadcast enabled on Austin street map!' : 'Radar broadcast paused. Your truck is hidden from public app.',
    isChecked ? 'fa-tower-broadcast' : 'fa-pause'
  );
}

function openScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.add('show');
}
function closeScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.remove('show');
}

function handleScheduleFormSubmit(e) {
  e.preventDefault();
  const day = document.getElementById('schedDayInput').value;
  const venue = document.getElementById('schedVenueInput').value;
  const address = document.getElementById('schedAddressInput').value;
  const shift = document.getElementById('schedShiftInput').value;
  const footfall = document.getElementById('schedFootfallInput').value;

  const newSlot = {
    id: `sch-${Date.now()}`,
    day,
    venue,
    address,
    shift,
    footfall,
    permit: 'Confirmed',
    permitClass: 'confirmed'
  };

  vendorSchedules.unshift(newSlot);
  renderSchedulesTable();
  closeScheduleModal();
  showToast(`New shift at ${venue} published to radar!`, 'fa-calendar-check');
}

function editScheduleSlot(id) {
  showToast('Shift slot editor opened', 'fa-pen-to-square');
}

function renderMenuItems() {
  const grid = document.getElementById('menuItemsGrid');
  if (!grid) return;

  const filtered = vendorMenuItems.filter(item => {
    const matchesCategory = currentMenuCategory === 'all' || item.category === currentMenuCategory;
    const matchesSearch = !currentMenuSearch || item.name.toLowerCase().includes(currentMenuSearch.toLowerCase()) || item.desc.toLowerCase().includes(currentMenuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const countBadge = document.getElementById('navMenuCountBadge');
  if (countBadge) countBadge.textContent = `${vendorMenuItems.length} Dishes`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
        <i class="fa-solid fa-bowl-food" style="font-size: 2rem; color: var(--accent-yellow); margin-bottom: 8px;"></i>
        <p>No dishes found matching the current search criteria.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(dish => {
    const tagsHtml = dish.tags ? dish.tags.map(t => `<span class="category-tab-btn" style="padding: 2px 6px; font-size: 0.65rem;">${t}</span>`).join(' ') : '';
    return `
      <div class="dish-manage-card" id="dishCard-${dish.id}">
        <div class="dish-card-img-wrap">
          <img src="${dish.photo || 'assets/grilled_ribs.jpg'}" alt="${dish.name}" class="dish-card-img" loading="lazy">
          <span class="dish-price-badge">$${dish.price.toFixed(2)}</span>
          <span class="dish-category-badge">${dish.categoryName}</span>
        </div>
        <div class="dish-card-body">
          <h4 class="dish-name">${dish.name}</h4>
          <p class="dish-desc">${dish.desc}</p>
          
          <div class="dish-meta-row">
            <span><i class="fa-solid fa-stopwatch text-gold"></i> Prep: ${dish.prepTime}</span>
            <div style="display: flex; gap: 4px;">${tagsHtml}</div>
          </div>

          <div class="dish-actions-row">
            <div class="dish-stock-toggle">
              <label class="switch-toggle" style="transform: scale(0.75);">
                <input type="checkbox" ${dish.inStock ? 'checked' : ''} onchange="toggleDishStock('${dish.id}', this.checked)">
                <span class="switch-slider"></span>
              </label>
              <span class="stock-status-pill ${dish.inStock ? 'in-stock' : 'out-stock'}">
                ${dish.inStock ? 'In Stock' : 'Sold Out (86\'d)'}
              </span>
            </div>

            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-icon-action" title="Edit Item" onclick="openEditDishModal('${dish.id}')">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button type="button" class="btn-icon-action delete" title="Delete Item" onclick="deleteDishItem('${dish.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');
}

function filterMenuCategory(cat) {
  currentMenuCategory = cat;
  document.querySelectorAll('.category-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.category-tab-btn[data-category="${cat}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  renderMenuItems();
}

function handleMenuSearch(val) {
  currentMenuSearch = val;
  renderMenuItems();
}

function toggleDishStock(dishId, isInStock) {
  const dish = vendorMenuItems.find(d => d.id === dishId);
  if (dish) {
    dish.inStock = isInStock;
    renderMenuItems();
    showToast(
      `${dish.name} is now ${isInStock ? 'IN STOCK' : 'MARKED SOLD OUT (86\'d)'}`,
      isInStock ? 'fa-check' : 'fa-ban'
    );
  }
}

function openAddDishModal() {
  document.getElementById('dishModalTitle').textContent = 'Add New Menu Item';
  document.getElementById('dishSubmitBtn').textContent = 'Save Menu Item';
  document.getElementById('dishForm').reset();
  document.getElementById('dishEditId').value = '';
  document.getElementById('dishModal').classList.add('show');
}

function openEditDishModal(dishId) {
  const dish = vendorMenuItems.find(d => d.id === dishId);
  if (!dish) return;

  document.getElementById('dishModalTitle').textContent = 'Edit Menu Item';
  document.getElementById('dishSubmitBtn').textContent = 'Update Dish';
  document.getElementById('dishEditId').value = dish.id;
  document.getElementById('dishNameInput').value = dish.name;
  document.getElementById('dishCategoryInput').value = dish.category;
  document.getElementById('dishPriceInput').value = dish.price;
  document.getElementById('dishPrepTimeInput').value = dish.prepTime;
  document.getElementById('dishPhotoUrlInput').value = dish.photo || '';
  document.getElementById('dishDescInput').value = dish.desc;
  document.getElementById('dishTagsInput').value = dish.tags ? dish.tags.join(', ') : '';

  document.getElementById('dishModal').classList.add('show');
}

function closeDishModal() {
  document.getElementById('dishModal').classList.remove('show');
}

function handleDishFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('dishEditId').value;
  const name = document.getElementById('dishNameInput').value;
  const category = document.getElementById('dishCategoryInput').value;
  const price = parseFloat(document.getElementById('dishPriceInput').value) || 12.00;
  const prepTime = document.getElementById('dishPrepTimeInput').value;
  const photo = document.getElementById('dishPhotoUrlInput').value || 'assets/grilled_ribs.jpg';
  const desc = document.getElementById('dishDescInput').value;
  const rawTags = document.getElementById('dishTagsInput').value;
  const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : [];

  const categoryMap = {
    'bbq': '🔥 Smoked BBQ',
    'burgers': '🍔 Smash Burgers',
    'sides': '🍟 Loaded Sides',
    'drinks': '🥤 Drinks & Sweets'
  };

  if (editId) {
    
    const dish = vendorMenuItems.find(d => d.id === editId);
    if (dish) {
      dish.name = name;
      dish.category = category;
      dish.categoryName = categoryMap[category] || 'Special';
      dish.price = price;
      dish.prepTime = prepTime;
      dish.photo = photo;
      dish.desc = desc;
      dish.tags = tags;
      showToast(`${dish.name} updated successfully!`, 'fa-pen');
    }
  } else {
    
    const newDish = {
      id: `menu-${Date.now()}`,
      name,
      category,
      categoryName: categoryMap[category] || 'Special',
      price,
      prepTime,
      photo,
      desc,
      tags,
      inStock: true
    };
    vendorMenuItems.unshift(newDish);
    showToast(`New dish ${name} added to menu!`, 'fa-plus');
  }

  renderMenuItems();
  closeDishModal();
}

function deleteDishItem(dishId) {
  const index = vendorMenuItems.findIndex(d => d.id === dishId);
  if (index !== -1) {
    const name = vendorMenuItems[index].name;
    vendorMenuItems.splice(index, 1);
    renderMenuItems();
    showToast(`Removed ${name} from menu.`, 'fa-trash');
  }
}

function renderOrdersQueue() {
  const grid = document.getElementById('ordersCardsGrid');
  if (!grid) return;

  const filtered = vendorOrders.filter(order => {
    const matchesStatus = currentOrderStatus === 'all' || order.status === currentOrderStatus;
    const matchesSearch = !currentOrderSearch || 
      order.customer.toLowerCase().includes(currentOrderSearch.toLowerCase()) || 
      order.id.includes(currentOrderSearch);
    return matchesStatus && matchesSearch;
  });

  const totalActive = vendorOrders.filter(o => o.status !== 'completed').length;
  const countIncoming = vendorOrders.filter(o => o.status === 'incoming').length;
  const countCooking = vendorOrders.filter(o => o.status === 'cooking').length;
  const countReady = vendorOrders.filter(o => o.status === 'ready').length;

  const navBadge = document.getElementById('navActiveOrdersBadge');
  if (navBadge) navBadge.textContent = `${totalActive} Active`;

  const countAll = document.getElementById('countAllOrders');
  if (countAll) countAll.textContent = totalActive;
  const countInc = document.getElementById('countIncomingOrders');
  if (countInc) countInc.textContent = countIncoming;
  const countCook = document.getElementById('countCookingOrders');
  if (countCook) countCook.textContent = countCooking;
  const countRdy = document.getElementById('countReadyOrders');
  if (countRdy) countRdy.textContent = countReady;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
        <i class="fa-solid fa-bell-concierge" style="font-size: 2rem; color: var(--accent-yellow); margin-bottom: 8px;"></i>
        <p>No orders in this status category right now.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(order => {
    let actionBtnHtml = '';
    if (order.status === 'incoming') {
      actionBtnHtml = `
        <button type="button" class="btn btn-primary btn-sm w-100" onclick="advanceOrderStatus('${order.id}')">
          <i class="fa-solid fa-fire-burner"></i> <span>Accept & Start Cooking</span>
        </button>
      `;
    } else if (order.status === 'cooking') {
      actionBtnHtml = `
        <button type="button" class="btn btn-primary btn-sm w-100" style="background:#22c55e;" onclick="advanceOrderStatus('${order.id}')">
          <i class="fa-solid fa-bell"></i> <span>Mark Ready & Send SMS</span>
        </button>
      `;
    } else if (order.status === 'ready') {
      actionBtnHtml = `
        <button type="button" class="btn btn-outline-white btn-sm w-100" onclick="advanceOrderStatus('${order.id}')">
          <i class="fa-solid fa-circle-check text-green"></i> <span>Complete & Hand Off</span>
        </button>
      `;
    } else {
      actionBtnHtml = `
        <span class="status-tag completed" style="width: 100%; justify-content: center; padding: 6px;">
          <i class="fa-solid fa-check"></i> Fulfilled & Picked Up
        </span>
      `;
    }

    const itemsHtml = order.items.map(item => `
      <div class="order-item-line">
        <span class="item-qty-name"><strong>${item.qty}x</strong> ${item.name}</span>
        ${item.note ? `<span class="item-custom-note"><i class="fa-solid fa-pencil"></i> ${item.note}</span>` : ''}
      </div>
    `).join('');

    return `
      <div class="order-manage-card status-${order.status}" id="orderCard-${order.id}">
        <div class="order-card-header">
          <span class="order-id-num">#${order.id}</span>
          <span class="order-timer-pill"><i class="fa-solid fa-clock"></i> ${order.time}</span>
        </div>

        <div class="order-customer-row">
          <div>
            <strong class="customer-name">${order.customer}</strong>
            <small style="display:block; font-size: 0.68rem; color: var(--text-dim);">${order.phone}</small>
          </div>
          <span class="order-type-tag">${order.type}</span>
        </div>

        <div class="order-items-list">
          ${itemsHtml}
        </div>

        <div class="order-total-row">
          <span>Order Total:</span>
          <strong class="order-total-price">$${order.total.toFixed(2)}</strong>
        </div>

        <div class="order-action-btn-group">
          ${actionBtnHtml}
        </div>
      </div>
    `;
  }).join('');
}

function filterOrderStatus(status) {
  currentOrderStatus = status;
  document.querySelectorAll('.order-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.order-tab-btn[data-status="${status}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  renderOrdersQueue();
}

function handleOrderSearch(val) {
  currentOrderSearch = val;
  renderOrdersQueue();
}

function advanceOrderStatus(orderId) {
  const order = vendorOrders.find(o => o.id === orderId);
  if (!order) return;

  if (order.status === 'incoming') {
    order.status = 'cooking';
    order.eta = 'Sizzling on grill / white oak pit';
    showToast(`Order #${order.id} for ${order.customer} is now COOKING on grill!`, 'fa-fire-burner');
  } else if (order.status === 'cooking') {
    order.status = 'ready';
    order.eta = 'Ready for pickup';
    showToast(`SMS sent to ${order.customer}! Order #${order.id} marked READY!`, 'fa-paper-plane');
  } else if (order.status === 'ready') {
    order.status = 'completed';
    showToast(`Order #${order.id} fulfilled and completed!`, 'fa-circle-check');
  }

  renderOrdersQueue();
  renderOverviewRecentOrders();
}

function simulateNewIncomingOrder() {
  const randomNames = ['Alex Morgan', 'Taylor Swift', 'Jordan Peterson', 'Casey Neistat', 'Sophia Rodriguez'];
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const newId = (1043 + Math.floor(Math.random() * 500)).toString();

  const newOrder = {
    id: newId,
    customer: name,
    phone: '(512) 555-0199',
    items: [
      { name: '16-Hr Smoked Texas Prime Brisket', qty: 1, note: 'Extra jalapeño slaw' },
      { name: 'Double Truffle Wagyu Smash Burger', qty: 1, note: '' }
    ],
    total: 39.00,
    type: 'Curbside Pickup',
    time: 'Just now',
    eta: 'New incoming order',
    status: 'incoming'
  };

  vendorOrders.unshift(newOrder);
  renderOrdersQueue();
  renderOverviewRecentOrders();

  const badge = document.getElementById('notificationCountBadge');
  if (badge) {
    const cur = parseInt(badge.textContent, 10) || 0;
    badge.textContent = cur + 1;
  }

  showToast(`🔔 New Order #${newId} received from ${name} ($39.00)!`, 'fa-burger');
}

function renderPayoutsTable() {
  const tbody = document.getElementById('payoutsTableBody');
  if (!tbody) return;

  tbody.innerHTML = vendorPayouts.map(pay => {
    return `
      <tr>
        <td><strong class="text-gold">${pay.ref}</strong></td>
        <td><span>${pay.date}</span></td>
        <td><strong>${pay.batch}</strong></td>
        <td><span style="font-size: 0.74rem; color: var(--text-dim);"><i class="fa-solid fa-building-columns text-gold"></i> ${pay.method}</span></td>
        <td><strong class="text-gold" style="font-size: 0.95rem;">$${pay.gross.toFixed(2)}</strong></td>
        <td><span class="status-tag completed"><span class="status-dot"></span> ${pay.status}</span></td>
        <td>
          <button type="button" class="btn btn-outline-white btn-sm" onclick="showToast('Downloading invoice ${pay.ref}.pdf...', 'fa-file-pdf')">
            <i class="fa-solid fa-download"></i> PDF
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openPayoutModal() {
  const modal = document.getElementById('payoutModal');
  if (modal) modal.classList.add('show');
}
function closePayoutModal() {
  const modal = document.getElementById('payoutModal');
  if (modal) modal.classList.remove('show');
}

function executePayout() {
  closePayoutModal();
  const availableBal = document.getElementById('earningAvailableBalance');
  if (availableBal) availableBal.textContent = '$0.00';

  const newPayout = {
    ref: `PAY-2026-${Math.floor(Math.random() * 900 + 100)}`,
    date: 'Today (Instant ACH)',
    batch: 'Instant Payout Request',
    method: 'Direct ACH (Chase **** 4821)',
    gross: 8450.00,
    status: 'Processing Transfer'
  };

  vendorPayouts.unshift(newPayout);
  renderPayoutsTable();
  showToast('Instant transfer of $8,450.00 initiated to Chase **** 4821!', 'fa-building-columns');
}

function downloadFinancialReport() {
  showToast('Generating 30-day comprehensive statement (CSV)...', 'fa-file-csv');
}

function openFlashSpecialModal() {
  const modal = document.getElementById('flashSpecialModal');
  if (modal) modal.classList.add('show');
}
function closeFlashSpecialModal() {
  const modal = document.getElementById('flashSpecialModal');
  if (modal) modal.classList.remove('show');
}

function handleFlashSpecialSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('flashSpecialTitle').value;
  closeFlashSpecialModal();
  showToast(`⚡ Flash Special Broadcasted: "${title}" to 3,840 nearby foodies!`, 'fa-bolt');
}

function toggleMobileSidebar(shouldOpen) {
  const sidebar = document.getElementById('dashboardSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar && backdrop) {
    if (shouldOpen) {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    }
  }
}

function toggleNotificationDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById('notificationMenu');
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) profileMenu.classList.remove('show');
  if (menu) menu.classList.toggle('show');
}

function toggleProfileDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById('profileMenu');
  const notifMenu = document.getElementById('notificationMenu');
  if (notifMenu) notifMenu.classList.remove('show');
  if (menu) menu.classList.toggle('show');
}

function closeDropdowns() {
  const notifMenu = document.getElementById('notificationMenu');
  const profileMenu = document.getElementById('profileMenu');
  if (notifMenu) notifMenu.classList.remove('show');
  if (profileMenu) profileMenu.classList.remove('show');
}

function clearAllNotifications() {
  const list = document.getElementById('notificationList');
  if (list) {
    list.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 0.78rem;">
        <i class="fa-solid fa-check-double text-gold" style="font-size: 1.2rem; display: block; margin-bottom: 4px;"></i>
        All notifications marked as read.
      </div>
    `;
  }
  const badge = document.getElementById('notificationCountBadge');
  if (badge) badge.style.display = 'none';
  showToast('All notifications marked as read', 'fa-check');
}

function handleLogout() {
  if (confirm('Are you sure you want to log out of the Food Feast Portal?')) {
    localStorage.removeItem('foodfeast_is_authenticated');
    showToast('Logging out... Redirecting to login', 'fa-right-from-bracket');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  }
}

function cycleThemeMode() {
  const html = document.documentElement;
  const cur = html.getAttribute('data-theme') || 'light';
  const next = (cur === 'dark' || cur === 'charcoal') ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  localStorage.setItem('ff_theme', next);
  localStorage.setItem('foodfeast_theme', next);
  updateThemeLucideIcon(next);

  setTimeout(() => {
    initOverviewCharts();
  }, 100);

  showToast(`Theme switched to ${next === 'dark' ? 'Warm Dark' : 'Cream & Tomato Light'}`, 'fa-palette');
}

function updateThemeLucideIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    const isDark = (theme === 'dark' || theme === 'charcoal');
    const iconType = isDark ? 'sun' : 'moon';
    themeToggleBtn.innerHTML = `<i data-lucide="${iconType}" id="themeLucideIcon" class="theme-lucide-icon"></i>`;
    themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    if (window.lucide) window.lucide.createIcons();
  }
}

function toggleRTLMode() {
  const html = document.documentElement;
  const isRtl = html.getAttribute('dir') === 'rtl';
  html.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
  const display = document.getElementById('rtlTextDisplay');
  if (display) display.textContent = isRtl ? 'RTL' : 'LTR';
  showToast(`Direction switched to ${isRtl ? 'Left-to-Right (LTR)' : 'Right-to-Left (RTL)'}`, 'fa-repeat');
}

function showToast(message, iconClass = 'fa-circle-check') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

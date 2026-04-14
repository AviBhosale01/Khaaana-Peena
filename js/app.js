/* =========================================
   KHAANA PEENA — Core App Utilities
   localStorage, toasts, routing, helpers
   ========================================= */

const KP = {

  // ─── STORAGE ───────────────────────────────
  save(key, data) {
    try { localStorage.setItem('kp_' + key, JSON.stringify(data)); } catch(e){}
  },
  load(key, fallback = null) {
    try {
      const v = localStorage.getItem('kp_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch(e){ return fallback; }
  },
  remove(key) { localStorage.removeItem('kp_' + key); },
  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith('kp_'))
      .forEach(k => localStorage.removeItem(k));
  },

  // ─── SESSION ───────────────────────────────
  getUser() { return this.load('user'); },
  getProfile() { return this.load('profile'); },
  isLoggedIn() { return !!this.getUser(); },

  requireAuth(redirectTo = 'login.html') {
    if (!this.isLoggedIn()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  redirectIfLoggedIn(redirectTo = 'dashboard.html') {
    if (this.isLoggedIn()) {
      window.location.href = redirectTo;
    }
  },

  logout() {
    this.remove('user');
    window.location.href = 'login.html';
  },

  // ─── TOASTS ────────────────────────────────
  toast(msg, type = 'info', duration = 3000) {
    const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), duration + 400);
  },

  // ─── NAVBAR ────────────────────────────────
  initNavbar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Scroll indicator
    const bar = document.createElement('div');
    bar.className = 'scroll-indicator';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + '%';
    });

    // Highlight active link
    const links = document.querySelectorAll('.nav-link');
    const curPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      if (href === curPage || href.endsWith(curPage)) l.classList.add('active');
    });

    // Populate avatar/name if logged in
    const user = this.getUser();
    const userArea = document.getElementById('nav-user-area');
    if (userArea && user) {
      userArea.innerHTML = `
        <div class="nav-user" onclick="window.location.href='profile.html'">
          <div class="nav-avatar">${user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <span style="font-size:.85rem;font-weight:600;color:var(--text-secondary)">${user.name?.split(' ')[0] || 'User'}</span>
        </div>`;
    } else if(userArea) {
      userArea.innerHTML = `<a href="login.html" class="btn btn-primary btn-sm">Login</a>`;
    }
  },

  // ─── SIDEBAR ───────────────────────────────
  initSidebar() {
    const links = document.querySelectorAll('.sidebar-link');
    const cur = window.location.pathname.split('/').pop();
    links.forEach(l => {
      if ((l.getAttribute('href') || '').endsWith(cur)) l.classList.add('active');
    });

    // Profile snippet
    const snap = document.getElementById('sidebar-profile');
    const user = this.getUser();
    if (snap && user) {
      const profile = this.getProfile();
      snap.innerHTML = `
        <div class="flex items-center gap-3" style="padding:var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--border);">
          <div class="avatar avatar-sm">${user.name?.[0]||'U'}</div>
          <div>
            <div style="font-size:.85rem;font-weight:700;">${user.name?.split(' ')[0]||'User'}</div>
            <div style="font-size:.72rem;color:var(--text-muted);">${profile?.weight ? profile.weight + ' kg' : 'Set profile'}</div>
          </div>
        </div>`;
    }
  },

  // ─── REVEAL ON SCROLL ──────────────────────
  initReveal() {
    const elems = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    if (!elems.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    elems.forEach(el => obs.observe(el));
  },

  // ─── FOOD RAIN (landing) ───────────────────
  initFoodRain(containerId = 'food-rain') {
    const container = document.getElementById(containerId);
    if (!container) return;
    const foods = ['🍛','🥘','🍲','🫕','☕','🥗','🍗','🥞','🫓','🥣','🍜','🫙','🥭','🌶️','🧅','🧄','🌿','🍅'];
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'food-drop';
      el.textContent = foods[Math.floor(Math.random() * foods.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = (6 + Math.random() * 8) + 's';
      el.style.animationDelay = (Math.random() * 8) + 's';
      el.style.fontSize = (1.2 + Math.random() * 1.4) + 'rem';
      container.appendChild(el);
    }
  },

  // ─── FORM UTILS ────────────────────────────
  serializeForm(form) {
    const data = {};
    new FormData(form).forEach((v, k) => {
      if (data[k]) {
        if (!Array.isArray(data[k])) data[k] = [data[k]];
        data[k].push(v);
      } else { data[k] = v; }
    });
    return data;
  },

  validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },

  // ─── DATE / GREETING ───────────────────────
  getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return { msg:'Good Morning', emoji:'🌅' };
    if (h < 17) return { msg:'Good Afternoon', emoji:'☀️' };
    if (h < 21) return { msg:'Good Evening', emoji:'🌆' };
    return { msg:'Good Night', emoji:'🌙' };
  },

  today() {
    return new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  },

  // ─── HEALTH TIPS ───────────────────────────
  getTip(profile) {
    const tips = [
      { tip: 'Drink at least 8 glasses of water today. Hydration regulates metabolism and appetite.', icon:'💧' },
      { tip: 'Eat slowly and mindfully. It takes 20 minutes for your brain to register fullness.', icon:'🧘' },
      { tip: 'A 10-minute post-meal walk can significantly lower blood sugar spikes.', icon:'🚶' },
      { tip: 'Include a source of protein in every meal to control hunger hormones.', icon:'💪' },
      { tip: 'Spices like turmeric, ginger, and cinnamon have powerful anti-inflammatory properties.', icon:'🌿' },
      { tip: 'Your last meal should be at least 2 hours before bedtime for better digestion.', icon:'🌙' },
      { tip: 'Fermented foods like dahi (yogurt) and idli improve gut microbiome health.', icon:'🦠' },
      { tip: 'Prep your meals on Sunday to stay consistent through the week.', icon:'📦' }
    ];
    if (profile?.conditions?.includes('diabetes')) tips.push(
      { tip:'Monitor your carbohydrate intake by distributing it evenly across meals.', icon:'🩸' }
    );
    if (profile?.conditions?.includes('hypertension')) tips.push(
      { tip:'Reducing sodium by just 1g per day can noticeably lower blood pressure over time.', icon:'❤️' }
    );
    return tips[Math.floor(Math.random() * tips.length)];
  },

  // ─── CONFETTI ──────────────────────────────
  confetti() {
    const colors = ['#FF6B35','#F7C59F','#2ECC71','#3498DB','#F39C12','#9B59B6'];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.cssText = `
        left:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay:${Math.random()*2}s;
        animation-duration:${2+Math.random()*1.5}s;
        width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
        border-radius:${Math.random()>0.5?'50%':'2px'};
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  },

  // ─── RIPPLE EFFECT ─────────────────────────
  addRipple(btn) {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.className = 'ripple-circle';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size/2) + 'px';
      r.style.top  = (e.clientY - rect.top  - size/2) + 'px';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  },

  // ─── INIT ALL ──────────────────────────────
  init() {
    this.initNavbar();
    this.initSidebar();
    this.initReveal();
    document.querySelectorAll('.ripple-btn').forEach(b => this.addRipple(b));
  }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => KP.init());

/* =========================================
   KHAANA PEENA — Auth Module
   Login, Signup, Session Management
   ========================================= */

const Auth = {

  init() {
    this.initTabs();
    this.initForms();
    KP.redirectIfLoggedIn('dashboard.html');
  },

  initTabs() {
    const tabs = document.querySelectorAll('[data-auth-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.authTab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('[data-auth-panel]').forEach(p => {
          p.style.display = p.dataset.authPanel === target ? 'block' : 'none';
        });
      });
    });
  },

  initForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) loginForm.addEventListener('submit', e => { e.preventDefault(); this.login(loginForm); });
    if (signupForm) signupForm.addEventListener('submit', e => { e.preventDefault(); this.signup(signupForm); });
  },

  login(form) {
    const email    = form.querySelector('#login-email').value.trim();
    const password = form.querySelector('#login-password').value;
    const btn      = form.querySelector('[type="submit"]');

    if (!email || !password) { KP.toast('Please fill all fields','warning'); return; }
    if (!KP.validateEmail(email)) { KP.toast('Enter a valid email','error'); return; }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner spinner-sm"></span> Signing in...';

    setTimeout(() => {
      const users = KP.load('users', []);
      const user  = users.find(u => u.email === email && u.password === this.hash(password));

      if (!user) {
        // Demo auto-login for UI purposes
        const demoUser = { name:'Demo User', email, id:'demo_'+Date.now() };
        KP.save('user', demoUser);
        KP.toast('Welcome back! 🎉','success');
        setTimeout(() => window.location.href = 'dashboard.html', 800);
      } else {
        KP.save('user', { name:user.name, email:user.email, id:user.id });
        KP.toast(`Welcome back, ${user.name.split(' ')[0]}! 🎉`,'success');
        setTimeout(() => window.location.href = 'dashboard.html', 800);
      }
    }, 1200);
  },

  signup(form) {
    const name     = form.querySelector('#signup-name').value.trim();
    const email    = form.querySelector('#signup-email').value.trim();
    const password = form.querySelector('#signup-password').value;
    const confirm  = form.querySelector('#signup-confirm').value;
    const btn      = form.querySelector('[type="submit"]');

    if (!name || !email || !password || !confirm) { KP.toast('Please fill all fields','warning'); return; }
    if (!KP.validateEmail(email)) { KP.toast('Enter a valid email','error'); return; }
    if (password.length < 6) { KP.toast('Password must be at least 6 characters','warning'); return; }
    if (password !== confirm) { KP.toast('Passwords do not match','error'); return; }

    const users = KP.load('users', []);
    if (users.find(u => u.email === email)) { KP.toast('Email already registered. Please login.','error'); return; }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner spinner-sm"></span> Creating account...';

    setTimeout(() => {
      const newUser = { id:'user_'+Date.now(), name, email, password: this.hash(password), createdAt: new Date().toISOString() };
      users.push(newUser);
      KP.save('users', users);
      KP.save('user', { name, email, id: newUser.id });

      KP.toast(`Welcome to Khaana Peena, ${name.split(' ')[0]}! 🎉`,'success');
      setTimeout(() => window.location.href = 'onboarding.html', 900);
    }, 1200);
  },

  hash(str) {
    // Simple hash for demo (NOT production-safe)
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    return h.toString(36);
  }
};

document.addEventListener('DOMContentLoaded', () => Auth.init());

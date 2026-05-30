const email = 'samuelouvera@gmail.com';

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => item.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => navObserver.observe(section));

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate').forEach((element) => {
  animateObserver.observe(element);
});

function setupEmailCopy(btnId, labelId) {
  const btn = document.getElementById(btnId);
  const label = document.getElementById(labelId);
  if (!btn || !label) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = 'Copiado!';
    } catch {
      label.textContent = email;
      window.location.href = `mailto:${email}`;
    }

    setTimeout(() => {
      label.textContent = email;
    }, 1500);
  });
}

setupEmailCopy('email-btn', 'email-label');
setupEmailCopy('email-btn-2', 'email-label-2');

/* ── Scroll progress bar ── */
const prog = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
  if (!prog) return;
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
  prog.style.opacity = window.scrollY > 10 ? '1' : '0';
}, { passive: true });

/* ── Custom cursor ── */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
if (dot && ring) {
  let mx = -100, my = -100, rx = -100, ry = -100;
  let cursorActive = false;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!cursorActive) {
      cursorActive = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  dot.style.opacity = '0';
  ring.style.opacity = '0';

  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a, button, .project-card, .tech-item, .timeline-card, .cert-list li, .nav-link';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  window.addEventListener('mousedown', () => ring.classList.add('clicking'));
  window.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
}

/* ── Magnetic buttons ── */
document.querySelectorAll('.mag').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.3;
    const y = (e.clientY - r.top  - r.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  wrap.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});
